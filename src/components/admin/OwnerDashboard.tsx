"use client";

import { useEffect, useState } from "react";
import { menuItems, MenuItem } from "../../data/menuItems";

export default function OwnerDashboard() {

  const [items, setItems] = useState<MenuItem[]>([]);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("Biryani");

  const [image, setImage] = useState("");

  useEffect(() => {

    const savedMenu = localStorage.getItem("nikus_menu");

    if (savedMenu) {

      setItems(JSON.parse(savedMenu));

    } else {

      setItems(menuItems);

      localStorage.setItem(
        "nikus_menu",
        JSON.stringify(menuItems)
      );

    }

  }, []);

  const saveMenu = (updated: MenuItem[]) => {

    setItems(updated);

    localStorage.setItem(
      "nikus_menu",
      JSON.stringify(updated)
    );

  };

  const toggleItem = (id: string) => {

    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            available: !item.available,
          }
        : item
    );

    saveMenu(updated);

  };

  const deleteItem = (id: string) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    const updated = items.filter(
      (item) => item.id !== id
    );

    saveMenu(updated);

  };

  const addItem = () => {

    if (!name || !price) {

      alert("Enter item name and price");

      return;

    }

    const newItem: MenuItem = {

      id: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),

      name,

      price: Number(price),

      category,

      image:
        image ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",

      available: true,

    };

    const updated = [newItem, ...items];

    saveMenu(updated);

    setName("");

    setPrice("");

    setCategory("Biryani");

    setImage("");

  };

  const logout = () => {

    localStorage.removeItem("nikus_owner");

    window.location.href = "/";

  };

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

          <button
            onClick={logout}
            className="bg-orange-500 text-black px-6 sm:px-8 py-4 rounded-2xl font-black text-sm sm:text-base"
          >

            Sign Out

          </button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">

          <div className="bg-white text-black p-6 rounded-[28px]">

            <h2 className="text-4xl sm:text-5xl font-black">
              {items.length}
            </h2>

            <p className="font-bold mt-2">
              Total Items
            </p>

          </div>

          <div className="bg-green-500 text-black p-6 rounded-[28px]">

            <h2 className="text-4xl sm:text-5xl font-black">
              {
                items.filter(
                  (i) => i.available
                ).length
              }
            </h2>

            <p className="font-bold mt-2">
              Available Items
            </p>

          </div>

          <div className="bg-red-500 text-white p-6 rounded-[28px]">

            <h2 className="text-4xl sm:text-5xl font-black">
              {
                items.filter(
                  (i) => !i.available
                ).length
              }
            </h2>

            <p className="font-bold mt-2">
              OFF Items
            </p>

          </div>

        </div>

        {/* ADD ITEM */}

        <div className="bg-orange-500 text-black rounded-[35px] p-5 sm:p-7 md:p-10 mt-14">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Add New Item
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

            <input
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
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
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="p-4 rounded-2xl text-base sm:text-lg font-bold outline-none"
            />

          </div>

          <button
            onClick={addItem}
            className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-black text-sm sm:text-base"
          >

            Add Item

          </button>

        </div>

        {/* MENU ITEMS */}

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

                  <p className="text-lg font-bold mt-3">
                    ₹{item.price}
                  </p>

                  <p className="text-gray-600 font-bold mt-2">
                    {item.category}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <button
                      onClick={() =>
                        toggleItem(item.id)
                      }
                      className={`px-5 py-3 rounded-xl font-black text-sm ${
                        item.available
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >

                      {item.available
                        ? "ON"
                        : "OFF"}

                    </button>

                    <button
                      onClick={() => {

                        const newName = prompt(
                          "Edit Item Name",
                          item.name
                        );

                        const newPrice = prompt(
                          "Edit Price",
                          item.price.toString()
                        );

                        const newCategory = prompt(
                          "Edit Category",
                          item.category
                        );

                        const newImage = prompt(
                          "Edit Image URL",
                          item.image
                        );

                        if (
                          !newName ||
                          !newPrice ||
                          !newCategory
                        )
                          return;

                        const updated =
                          items.map(
                            (menuItem) =>
                              menuItem.id === item.id
                                ? {
                                    ...menuItem,
                                    name: newName,
                                    price:
                                      Number(
                                        newPrice
                                      ),
                                    category:
                                      newCategory,
                                    image:
                                      newImage ||
                                      item.image,
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
                      onClick={() =>
                        deleteItem(item.id)
                      }
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