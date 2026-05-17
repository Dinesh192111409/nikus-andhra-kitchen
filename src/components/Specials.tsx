"use client";

import { useState } from "react";

type Dish = {
  name: string;
  price: number;
  category: string;
  image: string;
};

const img = {
  biryani:
    "https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200",
  chicken:
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200",
  kebab:
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200",
  mutton:
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200",
  fish:
    "https://images.unsplash.com/photo-1611171711914-bf4f0c4f0f7d?q=80&w=1200",
  prawns:
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200",
  paneer:
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200",
  veg:
    "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1200",
  rice:
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
  noodles:
    "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200",
  soup:
    "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200",
  dessert:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200",
  drink:
    "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1200",
  bread:
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200",
  meals:
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200",
};

const dishes: Dish[] = [
  { name: "Veg Biryani", price: 190, category: "Biryani", image: img.biryani },
  { name: "Paneer Biryani", price: 220, category: "Biryani", image: img.biryani },
  { name: "Mushroom Biryani", price: 190, category: "Biryani", image: img.biryani },
  { name: "Kaaju Biryani", price: 220, category: "Biryani", image: img.biryani },
  { name: "Hyderabadi Chicken Dum Biryani", price: 230, category: "Biryani", image: img.biryani },
  { name: "Boneless Chicken Biryani", price: 260, category: "Biryani", image: img.biryani },
  { name: "Fry Piece Biryani", price: 230, category: "Biryani", image: img.biryani },
  { name: "Kebab Biryani", price: 230, category: "Biryani", image: img.biryani },
  { name: "Fish Biryani", price: 230, category: "Biryani", image: img.fish },
  { name: "Gongura Chicken Biryani", price: 240, category: "Biryani", image: img.biryani },
  { name: "Prawns Biryani", price: 280, category: "Biryani", image: img.prawns },
  { name: "Egg Biryani", price: 180, category: "Biryani", image: img.biryani },
  { name: "Mutton Dum Biryani", price: 350, category: "Biryani", image: img.mutton },
  { name: "Niku's Special Biryani", price: 250, category: "Biryani", image: img.biryani },

  { name: "Chicken Curry", price: 220, category: "Main Course", image: img.chicken },
  { name: "Kadai Chicken", price: 220, category: "Main Course", image: img.chicken },
  { name: "Butter Chicken", price: 230, category: "Main Course", image: img.chicken },
  { name: "Chicken Hyderabadi", price: 220, category: "Main Course", image: img.chicken },
  { name: "Gongura Chicken Curry", price: 230, category: "Main Course", image: img.chicken },
  { name: "Mutton Masala", price: 340, category: "Main Course", image: img.mutton },
  { name: "Mutton Guntur Gravy", price: 350, category: "Main Course", image: img.mutton },
  { name: "Fish Curry", price: 230, category: "Main Course", image: img.fish },
  { name: "Prawns Curry", price: 280, category: "Main Course", image: img.prawns },

  { name: "Dragon Chicken", price: 260, category: "Starters", image: img.chicken },
  { name: "Chicken Kebab", price: 200, category: "Starters", image: img.kebab },
  { name: "Chicken Lollipop", price: 210, category: "Starters", image: img.kebab },
  { name: "Pepper Chicken", price: 220, category: "Starters", image: img.chicken },
  { name: "Chilli Chicken", price: 220, category: "Starters", image: img.chicken },
  { name: "Gongura Chicken", price: 220, category: "Starters", image: img.chicken },
  { name: "Apollo Fish", price: 250, category: "Starters", image: img.fish },
  { name: "Fish Pepper", price: 230, category: "Starters", image: img.fish },
  { name: "Prawns Chilli", price: 270, category: "Starters", image: img.prawns },
  { name: "Prawns Ghee Roast", price: 280, category: "Starters", image: img.prawns },

  { name: "Paneer Butter Masala", price: 220, category: "Veg", image: img.paneer },
  { name: "Kadai Paneer", price: 220, category: "Veg", image: img.paneer },
  { name: "Palak Paneer", price: 230, category: "Veg", image: img.paneer },
  { name: "Mushroom Masala", price: 200, category: "Veg", image: img.veg },
  { name: "Veg Kolhapuri", price: 220, category: "Veg", image: img.veg },
  { name: "Gobi Chilli", price: 180, category: "Veg Starters", image: img.veg },
  { name: "Gobi 65", price: 180, category: "Veg Starters", image: img.veg },
  { name: "Veg Manchurian", price: 180, category: "Veg Starters", image: img.veg },
  { name: "Paneer Chilli", price: 220, category: "Veg Starters", image: img.paneer },

  { name: "Chicken Fried Rice", price: 165, category: "Rice & Noodles", image: img.rice },
  { name: "Chicken Noodles", price: 160, category: "Rice & Noodles", image: img.noodles },
  { name: "Egg Fried Rice", price: 145, category: "Rice & Noodles", image: img.rice },
  { name: "Veg Fried Rice", price: 155, category: "Rice & Noodles", image: img.rice },
  { name: "Veg Noodles", price: 140, category: "Rice & Noodles", image: img.noodles },

  { name: "Chapati 2 Pcs", price: 50, category: "Bread & Meals", image: img.bread },
  { name: "Parota 2 Pcs", price: 60, category: "Bread & Meals", image: img.bread },
  { name: "Full Meals", price: 180, category: "Bread & Meals", image: img.meals },
  { name: "Non Veg Meals", price: 260, category: "Bread & Meals", image: img.meals },
  { name: "Fish Meals", price: 250, category: "Bread & Meals", image: img.meals },

  { name: "Cream of Tomato Soup", price: 100, category: "Soups", image: img.soup },
  { name: "Sweet Corn Veg Soup", price: 100, category: "Soups", image: img.soup },
  { name: "Hot & Sour Chicken Soup", price: 120, category: "Soups", image: img.soup },

  { name: "Gulab Jamoon", price: 35, category: "Desserts", image: img.dessert },
  { name: "Carrot Halwa", price: 45, category: "Desserts", image: img.dessert },
  { name: "Kheer", price: 45, category: "Desserts", image: img.dessert },

  { name: "Water Bottle", price: 20, category: "Beverages", image: img.drink },
  { name: "Soft Drink", price: 25, category: "Beverages", image: img.drink },
  { name: "Lime Soda", price: 40, category: "Beverages", image: img.drink },
  { name: "Butter Milk", price: 30, category: "Beverages", image: img.drink },
  { name: "Sweet Lassi", price: 50, category: "Beverages", image: img.drink },
  { name: "Chocolate Milkshake", price: 100, category: "Beverages", image: img.drink },
];

const categories = ["All", ...Array.from(new Set(dishes.map((d) => d.category)))];

export default function Specials() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const addItem = (name: string) => {
    setCart((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  const removeItem = (name: string) => {
    setCart((prev) => ({
      ...prev,
      [name]: prev[name] > 1 ? prev[name] - 1 : 0,
    }));
  };

  const subtotal = dishes.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const gst = subtotal * 0.05;
  const distance = 7;
  const deliveryCharge = distance <= 5 ? 0 : (distance - 5) * 15;
  const total = subtotal + gst + deliveryCharge;
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <section id="menu" className="bg-orange-500 min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.4em] text-black text-sm font-bold">
            Complete Menu
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-black mt-5">
            ORDER YOUR FAVORITES
          </h1>

          <p className="text-black/80 mt-6 text-lg font-semibold">
            Select a category to view menu items.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-black ${
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
          <div className="bg-black text-white text-center p-12 rounded-[35px] shadow-2xl">
            <h2 className="text-4xl font-black text-orange-500">
              Choose a category
            </h2>
            <p className="text-gray-300 mt-4 text-xl">
              Click Biryani, Starters, Veg, Desserts or All to view items.
            </p>
          </div>
        )}

        {selectedCategory && (
          <div className="grid md:grid-cols-3 gap-10">
            {filteredDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] overflow-hidden shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                <div className="relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-orange-500 text-black px-4 py-2 rounded-full text-xs font-black">
                    {dish.category}
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="text-2xl font-black text-black leading-tight">
                    {dish.name}
                  </h2>

                  <p className="text-gray-700 mt-4 leading-7 text-base">
                    Freshly prepared Nikus Andhra Kitchen special.
                  </p>

                  <div className="flex items-center justify-between mt-8">
                    <div>
                      <p className="text-4xl font-black text-black">
                        ₹{dish.price}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">GST Extra</p>
                    </div>

                    {(cart[dish.name] || 0) === 0 ? (
                      <button
                        onClick={() => addItem(dish.name)}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition"
                      >
                        ADD +
                      </button>
                    ) : (
                      <div className="flex items-center gap-6 bg-black text-white px-6 py-4 rounded-full">
                        <button
                          onClick={() => removeItem(dish.name)}
                          className="text-3xl"
                        >
                          -
                        </button>

                        <span className="text-2xl font-bold">
                          {cart[dish.name]}
                        </span>

                        <button
                          onClick={() => addItem(dish.name)}
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
        <div className="fixed bottom-0 left-0 w-full bg-black text-white px-8 py-6 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xl">
                Items: <span className="font-bold">{totalItems}</span>
              </p>

              <p className="text-lg mt-2">Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p className="text-lg">GST (5%): ₹{gst.toFixed(2)}</p>
              <p className="text-lg">
                Delivery Charge: ₹{deliveryCharge.toFixed(2)}
              </p>

              <h2 className="text-4xl font-black mt-2 text-orange-500">
                Total: ₹{total.toFixed(2)}
              </h2>
            </div>

            <button className="bg-orange-500 hover:bg-orange-400 transition duration-300 text-black font-black px-14 py-5 rounded-full text-xl uppercase tracking-widest">
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}