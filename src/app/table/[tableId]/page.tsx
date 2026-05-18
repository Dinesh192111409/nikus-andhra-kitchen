"use client";

import { use, useState } from "react";
import { getActiveMenuItems } from "../../../utils/menu";
import type { MenuItem } from "../../../data/menuItems";
import { createFirebaseOrder } from "../../../utils/firebaseOrders";

const createOrderId = () => crypto.randomUUID();

type Props = {
  params: Promise<{
    tableId: string;
  }>;
};

export default function TablePage({ params }: Props) {
  const { tableId } = use(params);

  const [items] = useState<MenuItem[]>(() => getActiveMenuItems());
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [orderType, setOrderType] = useState<"Dine In" | "Pickup">("Dine In");
  const [containerCharge, setContainerCharge] = useState("0");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

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

  const packingCharge =
    orderType === "Pickup" ? Number(containerCharge) || 0 : 0;

  const gst = subtotal * 0.05;
  const total = subtotal + gst + packingCharge;

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const handlePaymentAndOrder = async () => {
    if (!customer.trim() || !phone.trim()) {
      alert("Please enter name and phone number");
      return;
    }

    if (totalItems === 0) {
      alert("Please add items");
      return;
    }

    try {
      setIsSaving(true);

      const newOrderId = createOrderId();

      const orderItems = Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([name, qty]) => `${name} x ${qty}`);

      await createFirebaseOrder({
        tableId,
        customer,
        phone,
        orderType,
        items: orderItems,
        subtotal,
        gst,
        packingCharge,
        total,
        payment,
        paymentStatus: payment === "Cash" ? "Cash Pending" : "Paid",
        status: "Pending",
      });

      if (payment === "UPI") {
        const upiLink = `upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus Andhra Kitchen&am=${total.toFixed(
          2
        )}&cu=INR`;

        window.location.assign(upiLink);
      }

      setOrderId(newOrderId);
      setOrderPlaced(true);
      setShowCheckout(false);
      setCart({});
    } catch (error) {
      console.error(error);
      alert("Order failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black text-white flex items-center justify-center p-4">
        <div className="bg-black/80 border border-orange-400/30 rounded-[30px] p-6 text-center max-w-xl w-full shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-orange-400 text-xs font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-4xl font-black mt-6">Order Placed</h1>

          <p className="text-orange-100 mt-5">
            Your order has been sent to the owner dashboard.
          </p>

          <div className="bg-black border border-orange-400/30 rounded-3xl p-5 mt-8">
            <p className="text-orange-300 font-bold">Order ID</p>
            <p className="break-all mt-2 text-sm">{orderId}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="bg-orange-500 text-black px-4 py-3 rounded-full font-black">
              Pending
            </div>

            <div className="bg-white/20 text-white px-4 py-3 rounded-full font-black">
              Accepted
            </div>

            <div className="bg-white/20 text-white px-4 py-3 rounded-full font-black">
              Preparing
            </div>

            <div className="bg-white/20 text-white px-4 py-3 rounded-full font-black">
              Served
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black text-white px-3 sm:px-5 md:px-8 py-5 pb-40">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/75 border border-orange-400/30 rounded-[26px] sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-orange-400 text-xs font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mt-5">
            Table {tableId}
          </h1>

          <p className="text-orange-100 mt-4 text-sm sm:text-lg">
            Scan QR → Select Category → Add Items → Pay
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto py-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-black/75 border border-orange-400/20 rounded-[28px] overflow-hidden shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200";
                }}
                className="w-full h-44 sm:h-48 md:h-56 object-cover bg-black"
              />

              <div className="p-5">
                <h2 className="text-xl sm:text-2xl font-black">{item.name}</h2>

                <p className="text-orange-300 font-bold mt-2 text-sm">
                  {item.category}
                </p>

                <p className="text-orange-300 text-2xl font-black mt-4">
                  ₹{item.price}
                </p>

                {(cart[item.name] || 0) === 0 ? (
                  <button
                    onClick={() => addItem(item.name)}
                    className="w-full mt-5 bg-orange-500 text-black py-4 rounded-2xl font-black active:scale-95 transition"
                  >
                    ADD
                  </button>
                ) : (
                  <div className="flex items-center justify-between mt-5 bg-black text-white py-3 px-6 rounded-2xl border border-orange-400/30">
                    <button
                      onClick={() => removeItem(item.name)}
                      className="text-3xl font-black text-orange-400 w-12"
                    >
                      -
                    </button>

                    <span className="text-2xl font-black">
                      {cart[item.name]}
                    </span>

                    <button
                      onClick={() => addItem(item.name)}
                      className="text-3xl font-black text-orange-400 w-12"
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
            <div className="max-w-7xl mx-auto flex justify-between items-center gap-3 sm:gap-4">
              <div>
                <p className="text-orange-300 font-bold text-sm">
                  {totalItems} Items Added
                </p>

                <h2 className="text-3xl font-black text-white">
                  ₹{total.toFixed(2)}
                </h2>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="bg-orange-500 text-black px-5 sm:px-8 py-4 rounded-full font-black text-xs sm:text-base active:scale-95 transition"
              >
                PAY NOW
              </button>
            </div>
          </div>
        )}

        {showCheckout && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#ff8c1a] via-[#ff7b00] to-black rounded-[30px] p-5 shadow-2xl border border-orange-300/30 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-black">Checkout</h2>

              <p className="text-orange-100 mt-2">Table {tableId}</p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setOrderType("Dine In")}
                  className={`p-4 rounded-2xl font-black ${
                    orderType === "Dine In"
                      ? "bg-black text-orange-400 border border-orange-400"
                      : "bg-white text-black"
                  }`}
                >
                  Dine In
                </button>

                <button
                  onClick={() => setOrderType("Pickup")}
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
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-bold text-white outline-none placeholder:text-gray-300"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-bold text-white outline-none placeholder:text-gray-300"
                />

                {orderType === "Pickup" && (
                  <input
                    type="number"
                    placeholder="Container / Packing Charge"
                    value={containerCharge}
                    onChange={(e) => setContainerCharge(e.target.value)}
                    className="w-full bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-bold text-white outline-none placeholder:text-gray-300"
                  />
                )}
              </div>

              <div className="mt-6 space-y-3">
                {Object.entries(cart)
                  .filter(([, qty]) => qty > 0)
                  .map(([name, qty]) => {
                    const menuItem = items.find((item) => item.name === name);

                    return (
                      <div
                        key={name}
                        className="bg-black/60 border border-orange-300/20 rounded-2xl p-4 flex justify-between gap-3"
                      >
                        <p className="font-bold">
                          {name} x {qty}
                        </p>

                        <p className="font-black">
                          ₹{(menuItem?.price || 0) * qty}
                        </p>
                      </div>
                    );
                  })}
              </div>

              <div className="bg-black/60 border border-orange-300/20 rounded-3xl p-5 mt-6">
                <div className="flex justify-between font-bold">
                  <p>Subtotal</p>
                  <p>₹{subtotal.toFixed(2)}</p>
                </div>

                <div className="flex justify-between font-bold mt-3">
                  <p>GST 5%</p>
                  <p>₹{gst.toFixed(2)}</p>
                </div>

                {orderType === "Pickup" && (
                  <div className="flex justify-between font-bold mt-3">
                    <p>Container</p>
                    <p>₹{packingCharge.toFixed(2)}</p>
                  </div>
                )}

                <div className="flex justify-between text-2xl font-black text-orange-300 mt-5">
                  <p>Total</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
              </div>

              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full mt-6 bg-black/60 border border-orange-300/30 p-4 rounded-2xl font-black text-white outline-none"
              >
                <option value="UPI">UPI / PhonePe / GPay</option>
                <option value="Cash">Cash</option>
              </select>

              <div className="grid grid-cols-1 gap-3 mt-6">
                <button
                  onClick={handlePaymentAndOrder}
                  disabled={isSaving}
                  className="bg-black text-orange-400 py-4 rounded-2xl font-black border border-orange-400 disabled:opacity-50"
                >
                  {isSaving ? "SAVING..." : "CONFIRM & PAY"}
                </button>

                <button
                  onClick={() => setShowCheckout(false)}
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