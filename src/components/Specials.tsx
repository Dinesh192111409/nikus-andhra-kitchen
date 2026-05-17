"use client";

import { useState } from "react";

const dishes = [

  // BIRYANI

  {
    name: "Hyderabadi Chicken Dum Biryani",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1200",
  },

  {
    name: "Boneless Chicken Biryani",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200",
  },

  {
    name: "Fry Piece Biryani",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200",
  },

  {
    name: "Kebab Biryani",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?q=80&w=1200",
  },

  {
    name: "Fish Biryani",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1200",
  },

  {
    name: "Gongura Chicken Biryani",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200",
  },

  {
    name: "Prawns Biryani",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1cb7d3b2?q=80&w=1200",
  },

  {
    name: "Egg Biryani",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
  },

  {
    name: "Mutton Dum Biryani",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200",
  },

  {
    name: "Nikus Special Biryani",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200",
  },

  // STARTERS

  {
    name: "Dragon Chicken",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200",
  },

  {
    name: "Chicken Kebab",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1200",
  },

  {
    name: "Chicken Lollipop",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200",
  },

  {
    name: "Pepper Chicken",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200",
  },

  {
    name: "Chilli Chicken",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200",
  },

  {
    name: "Gongura Chicken",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
  },

  {
    name: "Apollo Fish",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1611171711914-bf4f0c4f0f7d?q=80&w=1200",
  },

  {
    name: "Fish Pepper",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1200",
  },

  {
    name: "Prawns Chilli",
    price: 270,
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1cb7d3b2?q=80&w=1200",
  },

  {
    name: "Prawns Ghee Roast",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200",
  },

  // VEG

  {
    name: "Paneer Butter Masala",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200",
  },

  {
    name: "Kadai Paneer",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1666001100368-6ff8252b6f8c?q=80&w=1200",
  },

  {
    name: "Palak Paneer",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=1200",
  },

  {
    name: "Mushroom Masala",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1200",
  },

  {
    name: "Veg Kolhapuri",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
  },

  // FRIED RICE & NOODLES

  {
    name: "Chicken Fried Rice",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
  },

  {
    name: "Chicken Noodles",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200",
  },

  {
    name: "Egg Fried Rice",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200",
  },

  {
    name: "Veg Fried Rice",
    price: 155,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200",
  },

  // CURRIES

  {
    name: "Butter Chicken",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200",
  },

  {
    name: "Chicken Hyderabadi",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
  },

  {
    name: "Nikus Special Chicken Curry",
    price: 240,
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200",
  },

  {
    name: "Gongura Chicken Curry",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200",
  },

  {
    name: "Mutton Masala",
    price: 340,
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200",
  },

  {
    name: "Mutton Guntur Gravy",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
  },

  {
    name: "Fish Curry",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1200",
  },

  {
    name: "Prawns Curry",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200",
  },

];

export default function Specials() {

  const [cart, setCart] = useState<{ [key: string]: number }>({});

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

  const deliveryCharge =
    distance <= 5 ? 0 : (distance - 5) * 15;

  const total = subtotal + gst + deliveryCharge;

  const totalItems = Object.values(cart).reduce(
    (a, b) => a + b,
    0
  );

  return (

    <section
      id="menu"
      className="bg-orange-500 min-h-screen py-20 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="mb-20 text-center">

          <p className="uppercase tracking-[0.4em] text-black text-sm font-bold">
            Nikus Andhra Kitchen
          </p>

          <h1 className="text-6xl md:text-7xl font-black text-black mt-5">
            ORDER YOUR FAVORITES
          </h1>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {dishes.map((dish, index) => (

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

                <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-bold">
                  Bestseller
                </div>

              </div>

              <div className="p-7">

                <h2 className="text-3xl font-black text-black leading-tight">
                  {dish.name}
                </h2>

                <p className="text-gray-700 mt-4 leading-7 text-lg">
                  Authentic Andhra style with premium spices and rich flavour.
                </p>

                <div className="flex items-center justify-between mt-8">

                  <div>

                    <p className="text-4xl font-black text-black">
                      ₹{dish.price}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      GST Extra
                    </p>

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

      </div>

      {totalItems > 0 && (

        <div className="fixed bottom-0 left-0 w-full bg-black text-white px-8 py-6 shadow-2xl z-50">

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

            <div>

              <p className="text-xl">
                Items: <span className="font-bold">{totalItems}</span>
              </p>

              <p className="text-lg mt-2">
                Subtotal: ₹{subtotal.toFixed(2)}
              </p>

              <p className="text-lg">
                GST (5%): ₹{gst.toFixed(2)}
              </p>

              <p className="text-lg">
                Delivery Charge: ₹{deliveryCharge.toFixed(2)}
              </p>

              <h2 className="text-4xl font-black mt-2 text-orange-500">
                Total: ₹{total.toFixed(2)}
              </h2>

              <div className="mt-6">

                <p className="text-xl font-bold mb-4">
                  Payment Methods
                </p>

                <div className="flex flex-wrap gap-4">

                  <button className="bg-white text-black px-5 py-3 rounded-lg font-bold">
                    UPI
                  </button>

                  <button className="bg-white text-black px-5 py-3 rounded-lg font-bold">
                    GPay
                  </button>

                  <button className="bg-white text-black px-5 py-3 rounded-lg font-bold">
                    PhonePe
                  </button>

                  <button className="bg-white text-black px-5 py-3 rounded-lg font-bold">
                    Credit Card
                  </button>

                  <button className="bg-white text-black px-5 py-3 rounded-lg font-bold">
                    Net Banking
                  </button>

                </div>

              </div>

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