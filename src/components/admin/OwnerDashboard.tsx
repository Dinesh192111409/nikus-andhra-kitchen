"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { menuItems, MenuItem } from "../../data/menuItems";
import {
  FirebaseOrder,
  listenToOrders,
  updateFirebaseOrderStatus,
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

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Biryani");
  const [image, setImage] = useState("");

  useEffect(() => {
    setMounted(true);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/owner-login";
        return;
      }

      setItems(getInitialMenuItems());

      const unsubscribeOrders = listenToOrders((firebaseOrders) => {
        setOrders(firebaseOrders);
      });

      return () => unsubscribeOrders();
    });

    return () => unsubscribeAuth();
  }, []);

  const changeOrderStatus = async (
    id: string,
    status: FirebaseOrder["status"]
  ) => {
    await updateFirebaseOrderStatus(id, status);
  };

  const saveMenu = (updated: MenuItem[]) => {
    setItems(updated);
    localStorage.setItem("nikus_menu", JSON.stringify(updated));
  };

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, available: !item.available } : item
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
    setCategory("Biryani");
    setImage("");
  };

  const logout = async () => {
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

  const OrderCard = ({ order }: { order: FirebaseOrder }) => (
    <div className="bg-white text-black rounded-[28px] p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
        <div>
          <p className="uppercase text-xs font-black tracking-[0.25em] text-orange-500">
            {order.orderType}
          </p>

          <h3 className="text-3xl font-black mt-2">{order.customer}</h3>

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

        <div className="min-w-[250px]">
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

            <p className="font-black">Payment Status: {order.paymentStatus}</p>

            <h2 className="text-4xl font-black text-orange-500">
              ₹{order.total.toFixed(2)}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {order.status === "Pending" && order.id && (
              <>
                <button
                  onClick={() => changeOrderStatus(order.id!, "Accepted")}
                  className="bg-green-500 text-white px-5 py-3 rounded-xl font-black"
                >
                  Accept
                </button>

                <button
                  onClick={() => changeOrderStatus(order.id!, "Rejected")}
                  className="bg-red-500 text-white px-5 py-3 rounded-xl font-black"
                >
                  Reject
                </button>
              </>
            )}

            {order.status === "Accepted" && order.id && (
              <button
                onClick={() => changeOrderStatus(order.id!, "Preparing")}
                className="bg-orange-500 text-black px-5 py-3 rounded-xl font-black"
              >
                Preparing
              </button>
            )}

            {order.status === "Preparing" && order.id && (
              <button
                onClick={() => changeOrderStatus(order.id!, "Served")}
                className="bg-black text-white px-5 py-3 rounded-xl font-black"
              >
                Served
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
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
              className="bg-white text-black px-6 sm:px-8 py-4 rounded-2xl font-black text-center"
            >
              Table QR Codes
            </a>

            <button
              onClick={logout}
              className="bg-orange-500 text-black px-6 sm:px-8 py-4 rounded-2xl font-black"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-orange-500 text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">{todaysOrders.length}</h2>
            <p className="font-bold mt-2">Today Orders</p>
          </div>

          <div className="bg-white text-black p-6 rounded-[28px]">
            <h2 className="text-4xl font-black">
              ₹{todaysRevenue.toFixed(0)}
            </h2>
            <p className="font-bold mt-2">Today Payments</p>
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
              <option>Biryani</option>
              <option>Starters</option>
              <option>Veg Starters</option>
              <option>Curries</option>
              <option>Veg</option>
              <option>Rice & Noodles</option>
              <option>Bread & Meals</option>
              <option>Soups</option>
              <option>Egg</option>
              <option>Desserts</option>
              <option>Beverages</option>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Manage Menu Items
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white text-black rounded-[30px] overflow-hidden shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-black leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-lg font-bold mt-3">₹{item.price}</p>

                  <p className="text-gray-600 font-bold mt-2">
                    {item.category}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
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
                          item.price.toString()
                        );
                        const newCategory = prompt(
                          "Edit Category",
                          item.category
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
                            : menuItem
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
        </div>
      </div>
    </main>
  );
}