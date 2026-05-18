"use client";

import { useEffect, useState } from "react";
import { getActiveMenuItems } from "../utils/menu";
import type { MenuItem } from "../data/menuItems";
import { saveOrder } from "../utils/orders";

export default function Specials() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setItems(getActiveMenuItems());
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];

  const filteredDishes =
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

  const subtotal = items.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const gst = subtotal * 0.05;

  const total = subtotal + gst;

  const totalItems = Object.values(cart).reduce(
    (a, b) => a + b,
    0
  );

  const handleCheckout = () => {
    if (totalItems === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      id: Date.now().toString(),

      type: "specials" as const,

      customer: "Walk-in Customer",

      phone: "Not Provided",

      items: Object.entries(cart)
        .filter(([_, qty]) => qty > 0)
        .map(([name, qty]) => `${name} x ${qty}`),

      subtotal,

      gst,

      total,

      payment: "UPI",

      status: "Pending" as const,

      date: new Date().toLocaleString("en-IN"),
    };

    saveOrder(order);

    const upiLink = `upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus Andhra Kitchen&am=${total.toFixed(
      2
    )}&cu=INR`;

    window.location.href = upiLink;

    setTimeout(() => {
      setCart({});

      alert("Order sent successfully!");
    }, 3000);
  };

  return (
    <section
      id="menu"
      className="bg-orange-500 min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden pb-40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12 text-center">
          <p className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-black text-xs sm:text-sm font-bold">
            Complete Menu
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black mt-5 leading-tight">
            ORDER YOUR FAVORITES
          </h1>

          <p className="text-black/80 mt-5 md:mt-6 text-base sm:text-lg font-semibold">
            Select a category to view menu items.
          </p>
        </div>

        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 mb-8 md:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 sm:px-6 py-3 rounded-full font-black text-sm sm:text-base ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {!selectedCategory && (
          <div className="bg-black text-white text-center p-8 sm:p-10 md:p-12 rounded-[28px] md:rounded-[35px] shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-orange-500">
              Choose a category
            </h2>

            <p className="text-gray-300 mt-4 text-base sm:text-xl">
              Click Biryani, Starters, Veg, Desserts or All to
              view items.
            </p>
          </div>
        )}

        {selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
            {filteredDishes.map((dish, index) => (
              <div
                key={dish.id || index}
                className="bg-white rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-orange-500 text-black px-4 py-2 rounded-full text-xs font-black">
                    {dish.category}
                  </div>
                </div>

                <div className="p-5 md:p-7">
                  <h2 className="text-xl md:text-2xl font-black text-black leading-tight">
                    {dish.name}
                  </h2>

                  <p className="text-gray-700 mt-4 leading-7 text-sm md:text-base">
                    Freshly prepared Nikus Andhra Kitchen
                    special.
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-8">
                    <div>
                      <p className="text-3xl md:text-4xl font-black text-black">
                        ₹{dish.price}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        GST Extra
                      </p>
                    </div>

                    {(cart[dish.name] || 0) === 0 ? (
                      <button
                        onClick={() => addItem(dish.name)}
                        className="bg-black text-white px-7 md:px-8 py-4 rounded-full font-bold hover:scale-105 transition w-full sm:w-auto"
                      >
                        ADD +
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-6 bg-black text-white px-6 py-4 rounded-full w-full sm:w-auto">
                        <button
                          onClick={() =>
                            removeItem(dish.name)
                          }
                          className="text-3xl"
                        >
                          -
                        </button>

                        <span className="text-2xl font-bold">
                          {cart[dish.name]}
                        </span>

                        <button
                          onClick={() =>
                            addItem(dish.name)
                          }
                          className="text-3xl"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white px-4 sm:px-6 md:px-8 py-4 md:py-6 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
            <div>
              <p className="text-base md:text-xl">
                Items:
                <span className="font-bold ml-2">
                  {totalItems}
                </span>
              </p>

              <p className="text-sm md:text-lg mt-1 md:mt-2">
                Subtotal: ₹{subtotal.toFixed(2)}
              </p>

              <p className="text-sm md:text-lg">
                GST (5%): ₹{gst.toFixed(2)}
              </p>

              <h2 className="text-2xl md:text-4xl font-black mt-2 text-orange-500">
                Total: ₹{total.toFixed(2)}
              </h2>
            </div>

            <button
              onClick={handleCheckout}
              className="bg-orange-500 hover:bg-orange-400 transition duration-300 text-black font-black px-8 md:px-14 py-4 md:py-5 rounded-full text-base md:text-xl uppercase tracking-widest"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}