"use client";

import { useState } from "react";

const menuItems = [
  // Biryani
  { name: "Veg Biryani", price: 190 },
  { name: "Paneer Biryani", price: 220 },
  { name: "Mushroom Biryani", price: 190 },
  { name: "Kaaju Biryani", price: 220 },
  { name: "Hyderabadi Chicken Dum Biryani", price: 230 },
  { name: "Boneless Chicken Biryani", price: 260 },
  { name: "Fry Piece Biryani", price: 230 },
  { name: "Kebab Biryani", price: 230 },
  { name: "Fish Biryani", price: 230 },
  { name: "Gongura Chicken Biryani", price: 240 },
  { name: "Prawns Biryani", price: 280 },
  { name: "Egg Biryani", price: 180 },
  { name: "Omelette Biryani", price: 160 },
  { name: "Mutton Dum Biryani", price: 350 },
  { name: "Mutton Fry Piece Biryani", price: 350 },
  { name: "Gongura Mutton Biryani", price: 350 },
  { name: "Guntur Chicken Biryani", price: 230 },
  { name: "Rayalaseema Chicken Biryani", price: 230 },
  { name: "Niku's Special Biryani", price: 250 },
  { name: "Lollipop Biryani", price: 230 },

  // Starters
  { name: "Dragon Chicken", price: 260 },
  { name: "Chicken Hyderabadi Dry", price: 230 },
  { name: "Wings Kebab", price: 190 },
  { name: "Chicken Kebab", price: 200 },
  { name: "Niku's Special Kebab", price: 250 },
  { name: "Boneless Kebab", price: 240 },
  { name: "Chicken Lollipop", price: 210 },
  { name: "Niku's Special Lollipop", price: 230 },
  { name: "Pepper Chicken", price: 220 },
  { name: "Chilli Chicken", price: 220 },
  { name: "Guntur Chicken Fry", price: 220 },
  { name: "Rayalaseema Chicken Fry", price: 220 },
  { name: "Gongura Chicken", price: 220 },
  { name: "Kona Seema Kodi Vepudu", price: 230 },
  { name: "Nati Kodi Fry", price: 280 },
  { name: "Kshatriya Dry", price: 300 },
  { name: "Nellore Chicken", price: 230 },
  { name: "Golden Chicken", price: 260 },
  { name: "Garlic Chicken Boneless", price: 260 },
  { name: "Lemon Chicken Boneless", price: 260 },
  { name: "Chicken 65 Boneless", price: 260 },
  { name: "Chicken Majestic Boneless", price: 260 },
  { name: "Apollo Fish", price: 250 },
  { name: "Fish Manchurian", price: 240 },
  { name: "Fish Kebab", price: 200 },
  { name: "Fish Chilli", price: 230 },
  { name: "Fish Pepper", price: 230 },
  { name: "Prawns Chilli", price: 270 },
  { name: "Prawns Pepper Dry", price: 270 },
  { name: "Prawns Ghee Roast", price: 280 },
  { name: "Royyala Vepudu", price: 270 },
  { name: "Bangda Oil Fry", price: 200 },

  // Veg Starters
  { name: "Gobi Chilli", price: 180 },
  { name: "Gobi Pepper", price: 180 },
  { name: "Gobi 65", price: 180 },
  { name: "Gobi Kebab", price: 170 },
  { name: "Gobi Pakoda", price: 170 },
  { name: "Veg Manchurian", price: 180 },
  { name: "Veg Chilli", price: 170 },
  { name: "Paneer Manchurian", price: 220 },
  { name: "Paneer Chilli", price: 220 },
  { name: "Paneer Pepper Dry", price: 220 },
  { name: "Paneer Sholay Kebab", price: 230 },
  { name: "Paneer 65", price: 220 },
  { name: "Mushroom Manchurian", price: 190 },
  { name: "Mushroom Anarkali", price: 180 },
  { name: "Mushroom 65", price: 190 },
  { name: "Mushroom Pepper Dry", price: 180 },
  { name: "Babycorn Manchurian", price: 180 },
  { name: "Babycorn Pepper", price: 180 },
  { name: "Babycorn 65", price: 180 },
  { name: "Babycorn Chilli", price: 190 },

  // Main Course
  { name: "Chicken Curry", price: 220 },
  { name: "Kadai Chicken", price: 220 },
  { name: "Butter Chicken", price: 230 },
  { name: "Chicken Hyderabadi", price: 220 },
  { name: "Chicken Kolhapuri", price: 220 },
  { name: "Chicken Punjabi", price: 230 },
  { name: "Ginger Chicken", price: 220 },
  { name: "Niku's Special Chicken Curry", price: 240 },
  { name: "Methi Chicken Curry", price: 220 },
  { name: "Gongura Chicken Curry", price: 230 },
  { name: "Nati Kodi Pulusu", price: 290 },
  { name: "Mutton Masala", price: 340 },
  { name: "Mutton Hyderabadi", price: 340 },
  { name: "Mutton Guntur Gravy", price: 350 },
  { name: "Mutton Rogan Josh", price: 350 },
  { name: "Gongura Mutton Curry", price: 350 },
  { name: "Fish Curry", price: 230 },
  { name: "Prawns Curry", price: 280 },
  { name: "Egg Curry", price: 180 },
  { name: "Paneer Butter Masala", price: 220 },
  { name: "Aloo Gobi Masala", price: 190 },
  { name: "Mix Veg Curry", price: 190 },
  { name: "Kadai Veg", price: 180 },
  { name: "Dal Fry", price: 170 },
  { name: "Dal Tadka", price: 170 },
  { name: "Kadai Paneer", price: 220 },
  { name: "Kaju Masala", price: 230 },
  { name: "Cashew Masala", price: 230 },
  { name: "Malai Kofta", price: 220 },
  { name: "Mushroom Masala", price: 200 },
  { name: "Palak Paneer", price: 230 },
  { name: "Veg Hyderabadi", price: 200 },
  { name: "Veg Kolhapuri", price: 220 },
  { name: "Niku's Special Veg Curry", price: 200 },

  // Rice / Chinese
  { name: "Jeera Rice", price: 120 },
  { name: "Ghee Rice", price: 130 },
  { name: "Veg Noodles", price: 140 },
  { name: "Schezwan Veg Noodles", price: 150 },
  { name: "Veg Fried Rice", price: 155 },
  { name: "Schezwan Veg Fried Rice", price: 165 },
  { name: "Egg Noodles", price: 140 },
  { name: "Schezwan Egg Noodles", price: 150 },
  { name: "Egg Fried Rice", price: 145 },
  { name: "Schezwan Egg Fried Rice", price: 155 },
  { name: "Chicken Noodles", price: 160 },
  { name: "Chicken Fried Rice", price: 165 },
  { name: "Schezwan Chicken Fried Rice", price: 175 },
  { name: "Schezwan Chicken Noodles", price: 180 },

  // Bread / Meals / Soups
  { name: "Chapati 2 Pcs", price: 50 },
  { name: "Parota 2 Pcs", price: 60 },
  { name: "Pulka 2 Pcs", price: 40 },
  { name: "Full Meals", price: 180 },
  { name: "Non Veg Meals", price: 260 },
  { name: "Fish Meals", price: 250 },
  { name: "Curd Rice", price: 100 },
  { name: "Cream of Tomato Soup", price: 100 },
  { name: "Sweet Corn Veg Soup", price: 100 },
  { name: "Hot & Sour Veg Soup", price: 100 },
  { name: "Veg Clear Soup", price: 100 },
  { name: "Veg Manchow Soup", price: 100 },
  { name: "Hot & Sour Chicken Soup", price: 120 },
  { name: "Sweet Corn Chicken Soup", price: 120 },
  { name: "Chicken Manchow Soup", price: 120 },
  { name: "Chicken Clear Soup", price: 120 },

  // Egg / Desserts / Beverages
  { name: "Egg Chilli", price: 160 },
  { name: "Egg 65", price: 160 },
  { name: "Egg Manchurian", price: 160 },
  { name: "Egg Pepper Fry", price: 150 },
  { name: "Boiled Egg 2 Eggs", price: 40 },
  { name: "Egg Omelette", price: 70 },
  { name: "Egg Bhurji 2 Eggs", price: 90 },
  { name: "Gulab Jamoon", price: 35 },
  { name: "Carrot Halwa", price: 45 },
  { name: "Kheer", price: 45 },
  { name: "Bread Halwa", price: 45 },
  { name: "Vanilla Ice Cream", price: 90 },
  { name: "Butterscotch Ice Cream", price: 90 },
  { name: "Strawberry Ice Cream", price: 90 },
  { name: "Chocolate Ice Cream", price: 90 },
  { name: "Water Bottle Half Litre", price: 10 },
  { name: "Water Bottle", price: 20 },
  { name: "Soft Drink", price: 25 },
  { name: "Lime Soda", price: 40 },
  { name: "Lime Juice", price: 40 },
  { name: "Butter Milk", price: 30 },
  { name: "Sweet Lassi", price: 50 },
  { name: "Vanilla Milk Shake", price: 90 },
  { name: "Butterscotch Milk Shake", price: 90 },
  { name: "Strawberry Milk Shake", price: 100 },
  { name: "Chocolate Milkshake", price: 100 },
];

export default function Reservation() {
  const tables = [1, 2, 3, 4, 5, 6, 7];

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedBookedTable, setSelectedBookedTable] = useState<number | null>(null);
  const [showItems, setShowItems] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentMode, setPaymentMode] = useState<"UPI" | "GPay" | "PhonePe" | "Cash">("UPI");
  const [showClosedDining, setShowClosedDining] = useState(false);
  const [closedDining, setClosedDining] = useState<any[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("PM");

  const [bookedTables, setBookedTables] = useState<
    {
      table: number;
      name: string;
      phone: string;
      date: string;
      time: string;
      period: string;
    }[]
  >([]);

  const reserveTable = () => {
    if (!selectedTable) return;

    setBookedTables((prev) => [
      ...prev,
      {
        table: selectedTable,
        name,
        phone,
        date,
        time,
        period,
      },
    ]);

    alert(`Table ${selectedTable} Reserved Successfully`);

    setSelectedTable(null);
    setShowBooking(false);
    setName("");
    setPhone("");
    setDate("");
    setTime("");
  };

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

  const subtotal = menuItems.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  const closeTable = (payment: string) => {
    const closedTable = bookedTables.find(
      (table) => table.table === selectedBookedTable
    );

    if (closedTable) {
      setClosedDining((prev) => [
        ...prev,
        {
          ...closedTable,
          total,
          payment,
        },
      ]);
    }

    setBookedTables((prev) =>
      prev.filter((table) => table.table !== selectedBookedTable)
    );

    setSelectedBookedTable(null);
    setCart({});
    setShowPayment(false);
    setShowItems(false);
    setPaymentDone(false);
  };

  const completeOnlinePayment = () => {
    setPaymentDone(true);

    setTimeout(() => {
      closeTable(paymentMode);
    }, 2500);
  };

  return (
    <section id="reservation" className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-orange-400 uppercase tracking-[0.35em] font-black">
            Smart Dining System
          </p>

          <h2 className="text-5xl md:text-7xl font-black mt-6">
            TABLE RESERVATION
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="bg-white text-black p-10 rounded-[40px] shadow-2xl">
            <h3 className="text-4xl font-black mb-10">Select Table</h3>

            <div className="grid grid-cols-2 gap-6">
              {tables.map((table) => {
                const booking = bookedTables.find((t) => t.table === table);

                return (
                  <button
                    key={table}
                    onClick={() => {
                      if (booking) {
                        setSelectedBookedTable(table);
                        setShowBooking(false);
                      } else {
                        setSelectedTable(table);
                        setShowBooking(true);
                        setSelectedBookedTable(null);
                      }
                    }}
                    className={`p-8 rounded-3xl text-2xl font-black transition ${
                      booking
                        ? "bg-green-500 text-white"
                        : selectedTable === table
                        ? "bg-orange-500 text-black"
                        : "bg-gray-200 hover:bg-orange-300"
                    }`}
                  >
                    Table {table}

                    <div className="text-sm mt-3">
                      {booking ? "Booked" : "Available"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showBooking && (
            <div className="bg-orange-500 text-black p-10 rounded-[40px] shadow-2xl">
              <h3 className="text-5xl font-black">Reservation Details</h3>

              <button
                onClick={() => {
                  setShowBooking(false);
                  setSelectedTable(null);
                }}
                className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-bold"
              >
                ← Back To Tables
              </button>

              <div className="mt-10 space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-5 rounded-2xl text-xl outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-5 rounded-2xl text-xl outline-none"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-5 rounded-2xl text-xl outline-none"
                />

                <div className="flex gap-4">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-5 rounded-2xl text-xl outline-none"
                  />

                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="p-5 rounded-2xl text-xl outline-none"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

                <button
                  onClick={reserveTable}
                  className="w-full bg-black text-white py-5 rounded-2xl text-2xl font-black"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          )}

          {selectedBookedTable && (
            <div className="bg-green-500 text-black p-10 rounded-[40px] shadow-2xl">
              <h3 className="text-5xl font-black">
                Table {selectedBookedTable}
              </h3>

              <button
                onClick={() => setShowItems(!showItems)}
                className="w-full mt-10 bg-black text-white py-5 rounded-2xl text-2xl font-black"
              >
                Add Items
              </button>

              {showItems && (
                <div className="mt-10 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-2xl flex justify-between items-center"
                    >
                      <div>
                        <p className="text-xl font-black">{item.name}</p>
                        <p className="text-lg">₹{item.price}</p>
                      </div>

                      {(cart[item.name] || 0) === 0 ? (
                        <button
                          onClick={() => addItem(item.name)}
                          className="bg-black text-white px-6 py-3 rounded-xl font-bold"
                        >
                          ADD +
                        </button>
                      ) : (
                        <div className="flex items-center gap-4 bg-black text-white px-5 py-3 rounded-xl">
                          <button
                            onClick={() => removeItem(item.name)}
                            className="text-2xl font-bold"
                          >
                            -
                          </button>

                          <span className="text-xl font-bold">
                            {cart[item.name]}
                          </span>

                          <button
                            onClick={() => addItem(item.name)}
                            className="text-2xl font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="bg-black text-white p-6 rounded-2xl mt-8">
                    <p className="text-xl">Subtotal: ₹{subtotal}</p>
                    <p className="text-xl mt-2">GST (5%): ₹{gst.toFixed(2)}</p>

                    <h3 className="text-4xl font-black text-orange-500 mt-4">
                      Total: ₹{total.toFixed(2)}
                    </h3>
                  </div>
                </div>
              )}

              {!showPayment ? (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full mt-10 bg-black text-white py-5 rounded-2xl text-2xl font-black"
                >
                  Finish Dining
                </button>
              ) : (
                <div className="mt-10 bg-white p-8 rounded-3xl">
                  <h3 className="text-4xl font-black mb-8 text-black">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["UPI", "GPay", "PhonePe", "Cash"].map((method) => (
                      <button
                        key={method}
                        onClick={() =>
                          setPaymentMode(
                            method as "UPI" | "GPay" | "PhonePe" | "Cash"
                          )
                        }
                        className={`px-5 py-4 rounded-xl font-bold ${
                          paymentMode === method
                            ? "bg-orange-500 text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {paymentMode !== "Cash" ? (
                    <div className="mt-10 text-center">
                      <p className="text-2xl font-black text-black mb-6">
                        Scan QR Code to Pay
                      </p>

                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus%20Andhra%20Kitchen&am=${total.toFixed(
                          2
                        )}&cu=INR`}
                        alt="UPI QR Code"
                        className="mx-auto rounded-2xl border-4 border-black"
                      />

                      <p className="text-black mt-5 text-xl font-bold">
                        UPI ID: nikusandhrakitchen@upi
                      </p>

                      <p className="text-gray-700 mt-2">
                        Supports UPI, GPay and PhonePe
                      </p>

                      <button
                        onClick={completeOnlinePayment}
                        className="mt-8 bg-green-500 text-white px-8 py-4 rounded-xl text-xl font-black"
                      >
                        Payment Completed
                      </button>

                      {paymentDone && (
                        <p className="mt-6 text-3xl font-black text-green-600">
                          Payment Successful ✓
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-10">
                      <p className="text-2xl font-black text-black">
                        Cash Payment Selected
                      </p>

                      <p className="text-gray-700 mt-3 text-lg">
                        Collect cash manually and close the table.
                      </p>

                      <button
                        onClick={() => closeTable("Cash")}
                        className="mt-8 bg-black text-white px-8 py-4 rounded-xl text-xl font-black"
                      >
                        Close Table
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-24 text-center">
          <button
            onClick={() => setShowClosedDining(!showClosedDining)}
            className="bg-white text-black px-10 py-5 rounded-3xl text-2xl font-black shadow-2xl hover:scale-105 transition"
          >
            Closed Dining History
          </button>
        </div>

        {showClosedDining && (
          <div className="mt-10 bg-white text-black p-10 rounded-[40px]">
            <h2 className="text-5xl font-black mb-10">
              Closed Dining History
            </h2>

            {closedDining.length === 0 ? (
              <p className="text-2xl">No Closed Tables Yet</p>
            ) : (
              <div className="space-y-6">
                {closedDining.map((table, index) => (
                  <div key={index} className="bg-gray-100 p-6 rounded-3xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black">
                          Table {table.table}
                        </h3>

                        <p className="text-xl">Customer: {table.name}</p>
                        <p className="text-xl">Payment: {table.payment}</p>

                        <p className="text-xl">
                          Total: ₹{table.total.toFixed(2)}
                        </p>
                      </div>

                      <div className="bg-green-500 text-white px-6 py-4 rounded-2xl text-xl font-black">
                        Dining Closed ✓
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}