"use client";

import { use, useEffect, useState } from "react";

import { getActiveMenuItems } from "../../../utils/menu";

import type { MenuItem } from "../../../data/menuItems";

import {
  createFirebaseOrder,
  FirebaseOrder,
  listenToSingleOrder,
} from "../../../utils/firebaseOrders";

type Props = {
  params: Promise<{
    tableId: string;
  }>;
};

export default function TablePage({ params }: Props) {
  const { tableId } = use(params);

  const [items] = useState<MenuItem[]>(() => getActiveMenuItems());

  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [selectedCategory, setSelectedCategory] = useState("");

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");

  const [payment, setPayment] = useState("UPI");

  const [orderType, setOrderType] = useState<
    "Dine In" | "Pickup"
  >("Dine In");

  const [packingCharge, setPackingCharge] = useState("0");

  const [showCheckout, setShowCheckout] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [orderId, setOrderId] = useState("");

  const [liveOrder, setLiveOrder] =
    useState<FirebaseOrder | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === ""
      ? []
      : items.filter((item) => {
          return (
            selectedCategory === "All" ||
            item.category === selectedCategory
          );
        });

  useEffect(() => {
    if (!orderId) return;

    const unsubscribe = listenToSingleOrder(
      orderId,
      (order) => {
        setLiveOrder(order);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  const addItem = (name: string) => {
    setCart((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  const removeItem = (name: string) => {
    setCart((prev) => {
      const updated = { ...prev };

      if (updated[name] > 1) {
        updated[name] -= 1;
      } else {
        delete updated[name];
      }

      return updated;
    });
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * (cart[item.name] || 0);
  }, 0);

  const gst = subtotal * 0.05;

  const containerCharge =
    orderType === "Pickup"
      ? Number(packingCharge || 0)
      : 0;

  const total = subtotal + gst + containerCharge;

  const totalItems = Object.values(cart).reduce(
    (a, b) => a + b,
    0
  );

  const handlePlaceOrder = async () => {
    if (!customer || !phone) {
      alert("Enter customer details");
      return;
    }

    const firebaseOrderId = await createFirebaseOrder({
      tableId,
      customer,
      phone,
      orderType,
      items: Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([name, qty]) => `${name} x ${qty}`),
      subtotal,
      gst,
      packingCharge: containerCharge,
      total,
      payment,
      paymentStatus:
        payment === "Cash"
          ? "Cash Pending"
          : "Paid",
      status: "Pending",
    });

    if (payment === "UPI") {
      const upiLink = `upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus Andhra Kitchen&am=${total.toFixed(
        2
      )}&cu=INR`;

      window.location.assign(upiLink);
    }

    setOrderId(firebaseOrderId);

    setOrderPlaced(true);

    setShowCheckout(false);

    setCart({});
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black text-white flex items-center justify-center p-4">
        <div className="bg-black/80 border border-orange-400/30 rounded-[30px] p-6 sm:p-8 text-center max-w-xl w-full shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-orange-400 text-xs font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-3xl sm:text-5xl font-black mt-6">
            Order Placed
          </h1>

          <p className="text-orange-100 mt-5 text-sm sm:text-lg">
            Owner will review your order shortly.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              "Pending",
              "Accepted",
              "Preparing",
              "Served",
            ].map((status) => (
              <div
                key={status}
                className={`px-4 py-3 rounded-full font-black text-sm sm:text-base ${
                  liveOrder?.status === status
                    ? "bg-orange-500 text-black"
                    : "bg-white/20 text-white"
                }`}
              >
                {status}
              </div>
            ))}
          </div>

          {liveOrder?.status === "Accepted" && (
            <p className="mt-6 bg-green-500 text-white p-4 rounded-2xl font-black">
              Order Accepted ✅
            </p>
          )}

          {liveOrder?.status === "Rejected" && (
            <p className="mt-6 bg-red-500 text-white p-4 rounded-2xl font-black">
              Order Rejected ❌
            </p>
          )}

          {liveOrder?.status === "Preparing" && (
            <p className="mt-6 bg-orange-500 text-black p-4 rounded-2xl font-black">
              Food Preparing 🍽️
            </p>
          )}

          {liveOrder?.status === "Served" && (
            <p className="mt-6 bg-green-600 text-white p-4 rounded-2xl font-black">
              Order Served ✅
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black text-white px-3 sm:px-5 md:px-8 py-5 pb-40">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/75 border border-orange-400/30 rounded-[26px] p-5 sm:p-7 shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-orange-400 text-xs font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-3xl sm:text-5xl font-black mt-5">
            Table {tableId}
          </h1>

          <p className="text-orange-100 mt-4 text-sm sm:text-lg">
            Scan → Order → Pay
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto py-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-5 py-3 rounded-full whitespace-nowrap font-black text-sm transition ${
                selectedCategory === category
                  ? "bg-black text-orange-400 border border-orange-400"
                  : "bg-black/70 text-white border border-orange-300/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory === "" && (
          <div className="bg-black/70 p-8 rounded-[30px] text-center border border-orange-400/20">
            <h2 className="text-3xl font-black text-orange-300">
              Select Category
            </h2>

            <p className="mt-3 text-orange-100">
              Choose Biryani, Starters, Curries and more.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-black/75 border border-orange-400/20 rounded-[28px] overflow-hidden shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 sm:h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-black">
                  {item.name}
                </h2>

                <p className="text-orange-300 font-bold mt-2">
                  {item.category}
                </p>

                <p className="text-orange-300 text-3xl font-black mt-4">
                  ₹{item.price}
                </p>

                {(cart[item.name] || 0) === 0 ? (
                  <button
                    onClick={() => addItem(item.name)}
                    className="w-full mt-5 bg-orange-500 text-black py-4 rounded-2xl font-black"
                  >
                    ADD
                  </button>
                ) : (
                  <div className="flex items-center justify-between mt-5 bg-black text-white py-3 px-6 rounded-2xl border border-orange-400/30">
                    <button
                      onClick={() =>
                        removeItem(item.name)
                      }
                      className="text-3xl font-black text-orange-400"
                    >
                      -
                    </button>

                    <span className="text-2xl font-black">
                      {cart[item.name]}
                    </span>

                    <button
                      onClick={() => addItem(item.name)}
                      className="text-3xl font-black text-orange-400"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 w-full bg-black border-t border-orange-400 p-4 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
              <div>
                <p className="text-orange-300 font-bold text-sm">
                  {totalItems} Items
                </p>

                <h2 className="text-3xl font-black">
                  ₹{total.toFixed(2)}
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowCheckout(true)
                }
                className="bg-orange-500 text-black px-6 sm:px-8 py-4 rounded-full font-black text-sm sm:text-lg"
              >
                PAY NOW
              </button>
            </div>
          </div>
        )}

        {showCheckout && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#ff8c1a] via-[#ff7b00] to-black rounded-[30px] p-5 sm:p-8 shadow-2xl border border-orange-300/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl sm:text-4xl font-black">
                Checkout
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() =>
                    setOrderType("Dine In")
                  }
                  className={`p-4 rounded-2xl font-black ${
                    orderType === "Dine In"
                      ? "bg-black text-orange-400 border border-orange-400"
                      : "bg-white text-black"
                  }`}
                >
                  Dine In
                </button>

                <button
                  onClick={() =>
                    setOrderType("Pickup")
                  }
                  className={`p-4 rounded-2xl font-black ${
                    orderType === "Pickup"
                      ? "bg-black text-orange-400 border border-orange-400"
                      : "bg-white text-black"
                  }`}
                >
                  Pickup
                </button>
              </div>

              <div className="space-y-4 mt-6">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customer}
                  onChange={(e) =>
                    setCustomer(e.target.value)
                  }
                  className="w-full bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-bold text-white outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-bold text-white outline-none"
                />

                {orderType === "Pickup" && (
                  <input
                    type="number"
                    placeholder="Container Charge"
                    value={packingCharge}
                    onChange={(e) =>
                      setPackingCharge(
                        e.target.value
                      )
                    }
                    className="w-full bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-bold text-white outline-none"
                  />
                )}
              </div>

              <div className="bg-black/60 rounded-3xl p-5 mt-6">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₹{subtotal.toFixed(2)}</p>
                </div>

                <div className="flex justify-between mt-3">
                  <p>GST</p>
                  <p>₹{gst.toFixed(2)}</p>
                </div>

                {orderType === "Pickup" && (
                  <div className="flex justify-between mt-3">
                    <p>Container</p>
                    <p>
                      ₹{containerCharge.toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex justify-between text-3xl font-black text-orange-300 mt-5">
                  <p>Total</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
              </div>

              <select
                value={payment}
                onChange={(e) =>
                  setPayment(e.target.value)
                }
                className="w-full mt-6 bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-black text-white"
              >
                <option value="UPI">
                  UPI / PhonePe / GPay
                </option>

                <option value="Cash">
                  Cash
                </option>
              </select>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-black text-orange-400 py-4 rounded-2xl font-black border border-orange-400"
                >
                  CONFIRM & PAY
                </button>

                <button
                  onClick={() =>
                    setShowCheckout(false)
                  }
                  className="bg-white text-black py-4 rounded-2xl font-black"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}