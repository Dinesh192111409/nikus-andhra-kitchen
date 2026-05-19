"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { auth } from "../../lib/firebase";
import { menuItems, MenuItem } from "../../data/menuItems";
import {
  FirebaseOrder,
  listenToOrders,
  updateFirebaseOrderStatus,
  deleteFirebaseOrder,
} from "../../utils/firebaseOrders";

const getInitialMenuItems = (): MenuItem[] => {
  if (typeof window === "undefined") return [];

  const savedMenu = localStorage.getItem("nikus_menu");

  if (!savedMenu) {
    localStorage.setItem("nikus_menu", JSON.stringify(menuItems));
    return menuItems;
  }

  try {
    return JSON.parse(savedMenu) as MenuItem[];
  } catch {
    localStorage.setItem("nikus_menu", JSON.stringify(menuItems));
    return menuItems;
  }
};

export default function OwnerDashboard() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<FirebaseOrder[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastOrderCountRef = useRef(0);
  const soundEnabledRef = useRef(false);
  const knownOrderIdsRef = useRef<Set<string>>(new Set());

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Main Course");
  const [image, setImage] = useState("");

  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("");
  const [selectedMenuIds, setSelectedMenuIds] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);

    if (!audioRef.current) {
      audioRef.current = new Audio("/order-alert.mp3");
      audioRef.current.preload = "auto";
      audioRef.current.loop = false;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/owner-login";
        return;
      }

      setItems(getInitialMenuItems());

      const unsubscribeOrders = listenToOrders((firebaseOrders) => {
        const currentOrderIds = new Set(
          firebaseOrders
            .map((order) => order.id)
            .filter((id): id is string => Boolean(id)),
        );

        const newPendingOrders = firebaseOrders.filter(
          (order) =>
            order.status === "Pending" &&
            order.id &&
            !knownOrderIdsRef.current.has(order.id),
        );

        if (
          soundEnabledRef.current &&
          knownOrderIdsRef.current.size !== 0 &&
          newPendingOrders.length > 0 &&
          audioRef.current
        ) {
          audioRef.current.pause();
          audioRef.current.loop = true;
          audioRef.current.currentTime = 0;

          audioRef.current.play().catch((err) => {
            console.log("Audio blocked:", err);
          });
        }

        knownOrderIdsRef.current = currentOrderIds;
        lastOrderCountRef.current = firebaseOrders.length;
        setOrders(firebaseOrders);
      });

      return () => unsubscribeOrders();
    });

    return () => unsubscribeAuth();
  }, []);

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const disableSound = () => {
    stopSound();

    setSoundEnabled(false);
    soundEnabledRef.current = false;

    alert("Sound disabled");
  };

  const enableSound = async () => {
    if (!audioRef.current) return;

    try {
      soundEnabledRef.current = true;
      setSoundEnabled(true);

      audioRef.current.volume = 1;
      audioRef.current.loop = false;
      audioRef.current.currentTime = 0;

      await audioRef.current.play();

      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      alert("Order sound enabled successfully");
    } catch (error) {
      console.log(error);
      alert("Browser blocked sound. Click Enable Sound again.");
    }
  };
  const changeOrderStatus = async (
    id: string,
    status: FirebaseOrder["status"],
  ) => {
    stopSound();

    await updateFirebaseOrderStatus(id, status);
  };

  const saveMenu = (updated: MenuItem[]) => {
    setItems(updated);
    localStorage.setItem("nikus_menu", JSON.stringify(updated));
  };

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item,
    );

    saveMenu(updated);
  };

  const deleteItem = (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const updated = items.filter((item) => item.id !== id);
    saveMenu(updated);
  };

  const addItem = () => {
    if (!name || !price) {
      alert("Enter item name and price");
      return;
    }

    const newItem: MenuItem = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      price: Number(price),
      category,
      image:
        image ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
      available: true,
    };

    saveMenu([newItem, ...items]);

    setName("");
    setPrice("");
    setCategory("Main Course");
    setImage("");
  };

  const logout = async () => {
    stopSound();
    await signOut(auth);
    window.location.href = "/owner-login";
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black text-orange-400">Loading...</h1>
      </main>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "Pending");
  const acceptedOrders = orders.filter((o) => o.status === "Accepted");
  const rejectedOrders = orders.filter((o) => o.status === "Rejected");
  const preparingOrders = orders.filter((o) => o.status === "Preparing");
  const servedOrders = orders.filter((o) => o.status === "Served");

  const revenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);

  const today = new Date().toLocaleDateString("en-IN");

  const todaysOrders = orders.filter((order) => {
    if (!order.createdAt?.toDate) return false;
    return order.createdAt.toDate().toLocaleDateString("en-IN") === today;
  });

  const todaysRevenue = todaysOrders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyOrders = orders.filter((order) => {
    if (!order.createdAt?.toDate) return false;

    const date = order.createdAt.toDate();

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const monthlyRevenue = monthlyOrders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);

  const filteredOrders = orders.filter((order) => {
    if (!order.createdAt?.toDate) return false;

    const date = order.createdAt.toDate();
    const orderDate = date.toISOString().split("T")[0];
    const orderMonth = String(date.getMonth() + 1).padStart(2, "0");
    const orderYear = String(date.getFullYear());

    const dateMatch = filterDate ? orderDate === filterDate : true;

    const statusMatch =
      filterStatus === "All" ? true : order.status === filterStatus;

    const paymentMatch =
      filterPayment === "All" ? true : order.paymentStatus === filterPayment;

    const monthMatch =
      filterMonth === "All" ? true : orderMonth === filterMonth;

    const yearMatch = filterYear === "All" ? true : orderYear === filterYear;

    return dateMatch && statusMatch && paymentMatch && monthMatch && yearMatch;
  });

  const filteredTotal = filteredOrders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.total, 0);

  const menuCategories = [
    "Main Course",
    "Bread",
    "Rice",
    "Biriyani",
    "Family Packs",
    "Combos",
    "Bucket Biriyani",
    "Soups",
    "Chinese",
    "Starters",
    "Beverages",
    "Desserts",
  ];

  const visibleMenuItems = items.filter((item) => {
    const searchMatch = menuSearch.trim()
      ? item.name.toLowerCase().includes(menuSearch.toLowerCase().trim()) ||
        item.category.toLowerCase().includes(menuSearch.toLowerCase().trim())
      : true;

    const categoryMatch = selectedMenuCategory
      ? item.category === selectedMenuCategory
      : true;

    if (!menuSearch.trim() && !selectedMenuCategory) return false;

    return searchMatch && categoryMatch;
  });

  const allVisibleSelected =
    visibleMenuItems.length > 0 &&
    visibleMenuItems.every((item) => selectedMenuIds.includes(item.id));

  const toggleSelectMenuItem = (id: string) => {
    setSelectedMenuIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedMenuIds((prev) =>
        prev.filter(
          (selectedId) =>
            !visibleMenuItems.some((item) => item.id === selectedId),
        ),
      );

      return;
    }

    setSelectedMenuIds((prev) => [
      ...prev,
      ...visibleMenuItems
        .filter((item) => !prev.includes(item.id))
        .map((item) => item.id),
    ]);
  };

  const clearMenuSelection = () => {
    setSelectedMenuIds([]);
  };

  const bulkUpdateAvailability = (available: boolean) => {
    if (selectedMenuIds.length === 0) {
      alert("Select at least one item");
      return;
    }

    const updated = items.map((item) =>
      selectedMenuIds.includes(item.id) ? { ...item, available } : item,
    );

    saveMenu(updated);
  };
  const clearFilteredHistory = async () => {
    if (filteredOrders.length === 0) {
      alert("No orders found to clear");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to delete ${filteredOrders.length} filtered orders?`,
    );

    if (!confirmDelete) return;

    await Promise.all(
      filteredOrders
        .filter((order) => order.id)
        .map((order) => deleteFirebaseOrder(order.id!)),
    );

    alert("Selected history cleared");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Nikus Andhra Kitchen Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`Filtered Orders: ${filteredOrders.length}`, 14, 30);
    doc.text(`Filtered Paid Total: Rs.${filteredTotal.toFixed(2)}`, 14, 38);

    autoTable(doc, {
      startY: 48,
      head: [
        ["Customer", "Phone", "Table", "Status", "Payment", "Total", "Date"],
      ],
      body: filteredOrders.map((order) => [
        order.customer,
        order.phone,
        order.tableId,
        order.status,
        order.paymentStatus,
        `Rs.${order.total.toFixed(2)}`,
        order.createdAt?.toDate
          ? order.createdAt.toDate().toLocaleString("en-IN")
          : "",
      ]),
    });

    doc.save("nikus-report.pdf");
  };

  const OrderCard = ({ order }: { order: FirebaseOrder }) => {
    const printBill = () => {
      stopSound();

      const printWindow = window.open("", "_blank");

      if (!printWindow) return;

      printWindow.document.write(`
      <html>
        <head>
          <title>Nikus Andhra Kitchen Bill</title>

          <style>
            body {
              font-family: Arial;
              padding: 20px;
            }

            h1 {
              text-align: center;
              margin-bottom: 10px;
            }

            h2 {
              margin-top: 25px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th, td {
              border: 1px solid black;
              padding: 10px;
              text-align: left;
            }

            .total {
              font-size: 24px;
              font-weight: bold;
              margin-top: 20px;
            }
          </style>
        </head>

        <body>
          <h1>Nikus Andhra Kitchen</h1>

          <p><strong>Customer:</strong> ${order.customer}</p>

          <p><strong>Phone:</strong> ${order.phone}</p>

          <p><strong>Table:</strong> ${order.tableId}</p>

          <p><strong>Status:</strong> ${order.status}</p>

          <p><strong>Payment:</strong> ${order.payment}</p>

          <p><strong>Date:</strong>
            ${
              order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString("en-IN")
                : "Just now"
            }
          </p>

          <h2>Items</h2>

          <table>
            <thead>
              <tr>
                <th>Items</th>
              </tr>
            </thead>

            <tbody>
              ${order.items
                .map(
                  (item) => `
                    <tr>
                      <td>${item}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>

          <p>Subtotal: ₹${order.subtotal.toFixed(2)}</p>

          <p>GST: ₹${order.gst.toFixed(2)}</p>

          ${
            order.packingCharge > 0
              ? `<p>Container: ₹${order.packingCharge.toFixed(2)}</p>`
              : ""
          }

          <p class="total">
            Total: ₹${order.total.toFixed(2)}
          </p>

          <script>
            window.onload = () => {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

      printWindow.document.close();
    };

    return (
      <div className="bg-white text-black rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
          <div>
            <p className="uppercase text-xs font-black tracking-[0.25em] text-orange-500">
              {order.orderType}
            </p>

            <h3 className="text-2xl sm:text-3xl font-black mt-2 break-words">{order.customer}</h3>

            <p className="text-lg mt-2 font-bold">Mobile: {order.phone}</p>

            <p className="text-lg mt-2 font-bold">Table: {order.tableId}</p>

            <p className="text-gray-600 mt-2">
              Date:{" "}
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString("en-IN")
                : "Just now"}
            </p>

            <div className="mt-5">
              <p className="font-black text-lg">Items</p>

              <ul className="list-disc ml-6 mt-2 text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:min-w-[250px]">
            <div
              className={`px-5 py-3 rounded-full text-center font-black ${
                order.status === "Pending"
                  ? "bg-yellow-400 text-black"
                  : order.status === "Accepted"
                    ? "bg-blue-500 text-white"
                    : order.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : order.status === "Preparing"
                        ? "bg-orange-500 text-black"
                        : "bg-green-500 text-white"
              }`}
            >
              {order.status}
            </div>

            <div className="mt-6 space-y-2 text-lg">
              <p>Subtotal: ₹{order.subtotal.toFixed(2)}</p>

              <p>GST: ₹{order.gst.toFixed(2)}</p>

              {order.packingCharge > 0 && (
                <p>Container: ₹{order.packingCharge.toFixed(2)}</p>
              )}

              <p className="font-black">Payment: {order.payment}</p>

              <p className="font-black">
                Payment Status: {order.paymentStatus}
              </p>

              <h2 className="text-4xl font-black text-orange-500">
                ₹{order.total.toFixed(2)}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
              <button
                onClick={printBill}
                className="bg-black text-white px-5 py-3 rounded-xl font-black w-full sm:w-auto"
              >
                Print Bill
              </button>

              {order.status === "Pending" && order.id && (
                <>
                  <button
                    onClick={() => changeOrderStatus(order.id!, "Accepted")}
                    className="bg-green-500 text-white px-5 py-3 rounded-xl font-black w-full sm:w-auto"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => changeOrderStatus(order.id!, "Rejected")}
                    className="bg-red-500 text-white px-5 py-3 rounded-xl font-black w-full sm:w-auto"
                  >
                    Reject
                  </button>
                </>
              )}

              {order.status === "Accepted" && order.id && (
                <button
                  onClick={() => changeOrderStatus(order.id!, "Preparing")}
                  className="bg-orange-500 text-black px-5 py-3 rounded-xl font-black w-full sm:w-auto"
                >
                  Preparing
                </button>
              )}

              {order.status === "Preparing" && order.id && (
                <button
                  onClick={() => changeOrderStatus(order.id!, "Served")}
                  className="bg-black text-white px-5 py-3 rounded-xl font-black w-full sm:w-auto"
                >
                  Served
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <main className="min-h-screen bg-black text-white w-full overflow-x-hidden px-3 sm:px-6 md:px-10 py-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.3em] text-orange-400 font-black text-xs sm:text-sm">
              Admin Panel
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mt-4 leading-tight">
              OWNER DASHBOARD
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/owner-dashboard/qr"
              className="bg-white text-black px-6 sm:px-8 py-4 rounded-2xl font-black text-center w-full sm:w-auto"
            >
              Table QR Codes
            </a>
            <button
              onClick={enableSound}
              className="bg-green-500 text-white px-6 sm:px-8 py-4 rounded-2xl font-black w-full sm:w-auto"
            >
              Enable Sound
            </button>

            <button
              onClick={disableSound}
              className="bg-red-500 text-white px-6 sm:px-8 py-4 rounded-2xl font-black w-full sm:w-auto"
            >
              Disable Sound
            </button>

            <button
              onClick={logout}
              className="bg-orange-500 text-black px-6 sm:px-8 py-4 rounded-2xl font-black w-full sm:w-auto"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mt-12">
          <div className="bg-yellow-400 text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{pendingOrders.length}</h2>
            <p className="font-bold mt-2">Pending</p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{acceptedOrders.length}</h2>
            <p className="font-bold mt-2">Accepted</p>
          </div>

          <div className="bg-orange-500 text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{preparingOrders.length}</h2>
            <p className="font-bold mt-2">Preparing</p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{servedOrders.length}</h2>
            <p className="font-bold mt-2">Served</p>
          </div>

          <div className="bg-white text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">₹{revenue.toFixed(0)}</h2>
            <p className="font-bold mt-2">Total Payments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-orange-500 text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{todaysOrders.length}</h2>
            <p className="font-bold mt-2">Today Orders</p>
          </div>

          <div className="bg-white text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">₹{todaysRevenue.toFixed(0)}</h2>
            <p className="font-bold mt-2">Today Payments</p>
          </div>

          <div className="bg-orange-500 text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{monthlyOrders.length}</h2>
            <p className="font-bold mt-2">This Month Orders</p>
          </div>

          <div className="bg-white text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">
              ₹{monthlyRevenue.toFixed(0)}
            </h2>
            <p className="font-bold mt-2">This Month Payments</p>
          </div>
        </div>

        <div className="bg-white text-black rounded-[35px] p-6 md:p-8 mt-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black">
                Reports & PDF Download
              </h2>

              <p className="font-bold mt-2">
                Filtered Orders: {filteredOrders.length}
              </p>

              <p className="font-bold mt-1">
                Filtered Total: ₹{filteredTotal.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setFilterDate("");
                  setFilterStatus("All");
                  setFilterPayment("All");
                  setFilterMonth("All");
                  setFilterYear("All");
                }}
                className="bg-black text-white px-6 py-4 rounded-2xl font-black"
              >
                Clear Filters
              </button>
              <button
                onClick={clearFilteredHistory}
                className="bg-red-600 text-white px-6 py-4 rounded-2xl font-black"
              >
                Clear History
              </button>

              <button
                onClick={downloadPDF}
                className="bg-orange-500 text-black px-6 py-4 rounded-2xl font-black"
              >
                Download PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-8">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border-2 border-black p-4 rounded-2xl font-bold"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border-2 border-black p-4 rounded-2xl font-bold"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Preparing</option>
              <option>Served</option>
              <option>Rejected</option>
            </select>

            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="border-2 border-black p-4 rounded-2xl font-bold"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Cash Pending</option>
            </select>

            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="border-2 border-black p-4 rounded-2xl font-bold"
            >
              <option value="All">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border-2 border-black p-4 rounded-2xl font-bold"
            >
              <option value="All">All Years</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
            </select>
          </div>

          <div className="overflow-x-auto mt-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Table</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Payment</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td className="p-4 font-bold" colSpan={7}>
                      No report data found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-300">
                      <td className="p-4 font-bold">{order.customer}</td>
                      <td className="p-4">{order.phone}</td>
                      <td className="p-4">{order.tableId}</td>
                      <td className="p-4">{order.status}</td>
                      <td className="p-4">{order.paymentStatus}</td>
                      <td className="p-4 font-black">₹{order.total}</td>
                      <td className="p-4">
                        {order.createdAt?.toDate
                          ? order.createdAt.toDate().toLocaleString("en-IN")
                          : ""}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {[
          ["Pending Orders", pendingOrders],
          ["Accepted Orders", acceptedOrders],
          ["Preparing Orders", preparingOrders],
          ["Rejected Orders", rejectedOrders],
          ["Served / Payment History", servedOrders],
        ].map(([title, list]) => (
          <section key={title as string} className="mt-16">
            <h2 className="text-4xl font-black">{title as string}</h2>

            <div className="space-y-6 mt-8">
              {(list as FirebaseOrder[]).length === 0 ? (
                <p className="bg-white text-black p-8 rounded-[28px] text-xl font-bold">
                  No {(title as string).toLowerCase()}
                </p>
              ) : (
                (list as FirebaseOrder[]).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </div>
          </section>
        ))}

        <div className="bg-orange-500 text-black rounded-[35px] p-5 sm:p-7 md:p-10 mt-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Add New Item
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <input
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            >
              {menuCategories.map((menuCategory) => (
                <option key={menuCategory}>{menuCategory}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Image URL optional"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            />
          </div>

          <button
            onClick={addItem}
            className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-black"
          >
            Add Item
          </button>
        </div>

        <div className="mt-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
                Manage Menu Items
              </h2>

              <p className="text-orange-200 font-bold mt-3">
                Search or select a category to show items. No items show by
                default.
              </p>
            </div>

            <div className="bg-white text-black rounded-[24px] p-5 min-w-full lg:min-w-[320px]">
              <p className="font-black">Selected Items</p>

              <h3 className="text-4xl font-black text-orange-500 mt-2">
                {selectedMenuIds.length}
              </h3>
            </div>
          </div>

          <div className="bg-white text-black rounded-[35px] p-5 sm:p-7 md:p-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              <input
                type="text"
                placeholder="Search item name or category"
                value={menuSearch}
                onChange={(e) => {
                  setMenuSearch(e.target.value);
                  setSelectedMenuIds([]);
                }}
                className="lg:col-span-2 border-2 border-black p-4 rounded-2xl font-bold outline-none"
              />

              <button
                onClick={toggleSelectAllVisible}
                disabled={visibleMenuItems.length === 0}
                className="bg-black text-white px-5 py-4 rounded-2xl font-black disabled:opacity-40"
              >
                {allVisibleSelected ? "Unselect All" : "Select All"}
              </button>

              <button
                onClick={clearMenuSelection}
                className="bg-gray-200 text-black px-5 py-4 rounded-2xl font-black"
              >
                Clear Selection
              </button>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedMenuCategory("");
                  setSelectedMenuIds([]);
                }}
                className={`px-5 py-3 rounded-full font-black ${
                  selectedMenuCategory === ""
                    ? "bg-orange-500 text-black"
                    : "bg-black text-white"
                }`}
              >
                All Categories
              </button>

              {menuCategories.map((menuCategory) => (
                <button
                  key={menuCategory}
                  onClick={() => {
                    setSelectedMenuCategory(menuCategory);
                    setSelectedMenuIds([]);
                  }}
                  className={`px-5 py-3 rounded-full font-black ${
                    selectedMenuCategory === menuCategory
                      ? "bg-orange-500 text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {menuCategory}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
              <button
                onClick={() => bulkUpdateAvailability(true)}
                className="bg-green-500 text-white px-6 py-4 rounded-2xl font-black"
              >
                Selected ON
              </button>

              <button
                onClick={() => bulkUpdateAvailability(false)}
                className="bg-red-500 text-white px-6 py-4 rounded-2xl font-black"
              >
                Selected OFF
              </button>

              <p className="bg-orange-100 text-black px-6 py-4 rounded-2xl font-black text-center">
                Showing: {visibleMenuItems.length}
              </p>
            </div>
          </div>

          {visibleMenuItems.length === 0 ? (
            <div className="bg-white text-black p-8 rounded-[30px] mt-10 text-xl font-black">
              Search item name or click a category to view menu items.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
              {visibleMenuItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white text-black rounded-[30px] overflow-hidden shadow-2xl border-4 ${
                    selectedMenuIds.includes(item.id)
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                    />

                    <label className="absolute top-4 left-4 bg-black text-white px-4 py-3 rounded-2xl font-black flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMenuIds.includes(item.id)}
                        onChange={() => toggleSelectMenuItem(item.id)}
                        className="w-5 h-5"
                      />
                      Select
                    </label>

                    <div
                      className={`absolute top-4 right-4 px-4 py-3 rounded-2xl font-black ${
                        item.available
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.available ? "ON" : "OFF"}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black leading-tight">
                      {item.name}
                    </h3>

                    <p className="text-lg font-bold mt-3">₹{item.price}</p>

                    <p className="text-gray-600 font-bold mt-2">
                      {item.category}
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`px-5 py-3 rounded-xl font-black text-sm ${
                          item.available
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {item.available ? "ON" : "OFF"}
                      </button>

                      <button
                        onClick={() => {
                          const newName = prompt("Edit Item Name", item.name);
                          const newPrice = prompt(
                            "Edit Price",
                            item.price.toString(),
                          );
                          const newCategory = prompt(
                            "Edit Category",
                            item.category,
                          );
                          const newImage = prompt("Edit Image URL", item.image);

                          if (!newName || !newPrice || !newCategory) return;

                          const updated = items.map((menuItem) =>
                            menuItem.id === item.id
                              ? {
                                  ...menuItem,
                                  name: newName,
                                  price: Number(newPrice),
                                  category: newCategory,
                                  image: newImage || item.image,
                                }
                              : menuItem,
                          );

                          saveMenu(updated);
                        }}
                        className="bg-orange-500 text-black px-5 py-3 rounded-xl font-black text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-black text-white px-5 py-3 rounded-xl font-black text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
