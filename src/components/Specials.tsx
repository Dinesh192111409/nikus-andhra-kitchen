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
        2,
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
      className="bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-[#1a1a1a] min-h-screen py-24 px-3 sm:px-4 pb-40 text-white overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center">
          <p className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black text-[10px] sm:text-xs md:text-sm font-black">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mt-5 drop-shadow-2xl break-words">
            ORDER FOOD ONLINE
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-orange-100 font-semibold">
            Fresh Andhra style food delivered fast.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
            <div className="bg-black text-orange-400 px-4 sm:px-5 py-3 rounded-full shadow-2xl font-black border border-orange-400 text-sm sm:text-base">
              Fast Delivery
            </div>

            <div className="bg-white text-black px-4 sm:px-5 py-3 rounded-full shadow-2xl font-black text-sm sm:text-base">
              Live Kitchen
            </div>

            <div className="bg-black text-orange-400 px-4 sm:px-5 py-3 rounded-full shadow-2xl font-black border border-orange-400 text-sm sm:text-base">
              Fresh Andhra Food
            </div>

            <div className="bg-white text-black px-4 sm:px-5 py-3 rounded-full shadow-2xl font-black text-sm sm:text-base">
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
            className="w-full bg-black/70 border border-orange-400 rounded-3xl p-4 sm:p-5 text-base sm:text-lg font-bold outline-none shadow-2xl text-white placeholder:text-gray-300"
          />
        </div>

        <div className="flex gap-3 sm:gap-4 overflow-x-auto py-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 sm:px-6 py-3 rounded-full whitespace-nowrap font-black transition duration-300 text-sm sm:text-base ${
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
          <div className="bg-black/70 p-6 sm:p-10 rounded-[30px] text-center shadow-2xl border border-orange-400/20 mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-orange-300">
              Select Category
            </h2>

            <p className="mt-3 text-sm sm:text-base text-orange-100 font-semibold">
              Choose Biryani, Starters, Curries and more.
            </p>
          </div>
        )}

        {selectedCategory !== "" && filteredDishes.length === 0 && (
          <div className="bg-black/70 p-6 sm:p-10 rounded-[30px] text-center shadow-2xl border border-orange-400/20">
            <h2 className="text-2xl sm:text-3xl font-black text-orange-300">
              No items found
            </h2>

            <p className="mt-3 text-sm sm:text-base text-orange-100 font-semibold">
              Try another category or search term.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish, index) => (
            <div
              key={dish.id || index}
              className="bg-gradient-to-br from-[#2a2a2a] to-black rounded-[30px] overflow-hidden shadow-2xl border border-orange-400/20 hover:scale-[1.02] transition duration-300"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-52 sm:h-64 object-cover"
              />

              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight break-words">
                      {dish.name}
                    </h2>

                    <p className="mt-2 text-orange-400 font-black uppercase tracking-wide text-xs sm:text-sm break-words">
                      {dish.category}
                    </p>
                  </div>

                  <p className="text-2xl sm:text-3xl font-black text-orange-400 shrink-0">
                    ₹{dish.price}
                  </p>
                </div>

                {(cart[dish.name] || 0) === 0 ? (
                  <button
                    onClick={() => addItem(dish.name)}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-400 text-black py-4 rounded-2xl font-black transition duration-300 shadow-xl text-sm sm:text-base"
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-6 sm:gap-8 mt-6 bg-black text-white py-4 rounded-2xl border border-orange-400/20">
                    <button
                      onClick={() => removeItem(dish.name)}
                      className="text-2xl sm:text-3xl font-black text-orange-400"
                    >
                      -
                    </button>

                    <span className="text-xl sm:text-2xl font-black">
                      {cart[dish.name]}
                    </span>

                    <button
                      onClick={() => addItem(dish.name)}
                      className="text-2xl sm:text-3xl font-black text-orange-400"
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
    </section>
  );
}