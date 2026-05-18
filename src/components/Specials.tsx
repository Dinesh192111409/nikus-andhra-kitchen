"use client";

import { useState } from "react";
import { getActiveMenuItems } from "../utils/menu";
import type { MenuItem } from "../data/menuItems";
import { saveOrder } from "../utils/orders";

const createOrderId = () => crypto.randomUUID();

export default function Specials() {
  const [items] = useState<MenuItem[]>(() => getActiveMenuItems());
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("UPI");

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredDishes =
    selectedCategory === ""
      ? []
      : items.filter((item) => {
          const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

          const matchesSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

          return matchesCategory && matchesSearch;
        });

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

  const subtotal = items.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCheckout = () => {
    if (!customer || !phone) {
      alert("Enter customer details");
      return;
    }

    const order = {
      id: createOrderId(),
      type: "specials" as const,
      customer,
      phone,
      items: Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([name, qty]) => `${name} x ${qty}`),
      subtotal,
      gst,
      total,
      payment,
      status: "Pending" as const,
      date: new Date().toLocaleString("en-IN"),
    };

    saveOrder(order);

    if (payment === "UPI") {
      const upiLink = `upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus Andhra Kitchen&am=${total.toFixed(
        2
      )}&cu=INR`;

      window.location.assign(upiLink);
    }

    alert("Order placed successfully!");

    setCart({});
    setCustomer("");
    setPhone("");
    setShowCheckout(false);
  };

  return (
    <section
      id="menu"
      className="bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-[#1a1a1a] min-h-screen py-24 px-4 pb-40 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="uppercase tracking-[0.35em] text-black text-xs sm:text-sm font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white mt-5 drop-shadow-2xl">
            ORDER FOOD ONLINE
          </h1>

          <p className="mt-4 text-lg text-orange-100 font-semibold">
            Fresh Andhra style food delivered fast.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-black text-orange-400 px-5 py-3 rounded-full shadow-2xl font-black border border-orange-400">
              Fast Delivery
            </div>

            <div className="bg-white text-black px-5 py-3 rounded-full shadow-2xl font-black">
              Live Kitchen
            </div>

            <div className="bg-black text-orange-400 px-5 py-3 rounded-full shadow-2xl font-black border border-orange-400">
              Fresh Andhra Food
            </div>

            <div className="bg-white text-black px-5 py-3 rounded-full shadow-2xl font-black">
              Secure Payments
            </div>
          </div>
        </div>

        <div className="mt-10">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/70 border border-orange-400 rounded-3xl p-5 text-lg font-bold outline-none shadow-2xl text-white placeholder:text-gray-300"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto py-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-black transition duration-300 ${
                selectedCategory === cat
                  ? "bg-black text-orange-400 shadow-2xl border border-orange-400"
                  : "bg-black/70 text-white border border-orange-300/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {selectedCategory === "" && (
          <div className="bg-black/70 p-10 rounded-[30px] text-center shadow-2xl border border-orange-400/20 mb-8">
            <h2 className="text-3xl font-black text-orange-300">
              Select Category
            </h2>

            <p className="mt-3 text-orange-100 font-semibold">
              Choose Biryani, Starters, Curries and more.
            </p>
          </div>
        )}

        {selectedCategory !== "" && filteredDishes.length === 0 && (
          <div className="bg-black/70 p-10 rounded-[30px] text-center shadow-2xl border border-orange-400/20">
            <h2 className="text-3xl font-black text-orange-300">
              No items found
            </h2>

            <p className="mt-3 text-orange-100 font-semibold">
              Try another category or search term.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDishes.map((dish, index) => (
            <div
              key={dish.id || index}
              className="bg-gradient-to-br from-[#2a2a2a] to-black rounded-[30px] overflow-hidden shadow-2xl border border-orange-400/20 hover:scale-[1.03] transition duration-300"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white leading-tight">
                      {dish.name}
                    </h2>

                    <p className="mt-2 text-orange-400 font-black uppercase tracking-wide text-sm">
                      {dish.category}
                    </p>
                  </div>

                  <p className="text-3xl font-black text-orange-400">
                    ₹{dish.price}
                  </p>
                </div>

                {(cart[dish.name] || 0) === 0 ? (
                  <button
                    onClick={() => addItem(dish.name)}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-black transition duration-300 shadow-xl"
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-8 mt-6 bg-black text-white py-4 rounded-2xl border border-orange-400/20">
                    <button
                      onClick={() => removeItem(dish.name)}
                      className="text-3xl font-black text-orange-400"
                    >
                      -
                    </button>

                    <span className="text-2xl font-black">
                      {cart[dish.name]}
                    </span>

                    <button
                      onClick={() => addItem(dish.name)}
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
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white border-t border-orange-400 shadow-2xl px-6 py-5 z-50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="font-black text-lg text-orange-300">
                {totalItems} Items Added
              </p>

              <h2 className="text-4xl font-black text-orange-400 mt-2">
                ₹{total.toFixed(2)}
              </h2>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="bg-orange-500 text-black px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition duration-300 shadow-2xl"
            >
              VIEW CART & CHECKOUT
            </button>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#ff8c1a] via-[#ff7b00] to-black rounded-[35px] p-8 shadow-2xl border border-orange-300/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white">
            <h2 className="text-4xl font-black text-white drop-shadow-xl">
              Checkout
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              <input
                type="text"
                placeholder="Customer Name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="border border-orange-300/30 bg-black/60 p-4 rounded-2xl font-bold text-white outline-none placeholder:text-gray-300"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-orange-300/30 bg-black/60 p-4 rounded-2xl font-bold text-white outline-none placeholder:text-gray-300"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-black text-white">
                Order Summary
              </h3>

              <div className="space-y-3 mt-5">
                {Object.entries(cart)
                  .filter(([, qty]) => qty > 0)
                  .map(([name, qty]) => (
                    <div
                      key={name}
                      className="flex justify-between bg-black/60 p-4 rounded-2xl border border-orange-300/20"
                    >
                      <p className="font-bold">
                        {name} x {qty}
                      </p>

                      <p className="font-black">
                        ₹
                        {(items.find((i) => i.name === name)?.price ?? 0) *
                          qty}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-8 bg-black/60 rounded-3xl p-6 border border-orange-300/20">
              <div className="flex justify-between font-bold">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between font-bold mt-3">
                <p>GST (5%)</p>
                <p>₹{gst.toFixed(2)}</p>
              </div>

              <div className="flex justify-between text-3xl font-black mt-5 text-orange-300">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-8">
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full border border-orange-300/30 bg-black/60 p-5 rounded-2xl font-black text-white outline-none"
              >
                <option value="UPI">UPI / PhonePe / GPay</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleCheckout}
                className="bg-black text-orange-400 py-5 rounded-2xl font-black text-lg hover:scale-105 transition duration-300 border border-orange-400"
              >
                PLACE ORDER
              </button>

              <button
                onClick={() => setShowCheckout(false)}
                className="bg-white text-black py-5 rounded-2xl font-black text-lg hover:scale-105 transition duration-300"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}