"use client";

import { useState } from "react";

const menuItems = [
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
  { name: "Mutton Dum Biryani", price: 350 },
  { name: "Niku's Special Biryani", price: 250 },

  { name: "Dragon Chicken", price: 260 },
  { name: "Chicken Kebab", price: 200 },
  { name: "Chicken Lollipop", price: 210 },
  { name: "Pepper Chicken", price: 220 },
  { name: "Chilli Chicken", price: 220 },
  { name: "Gongura Chicken", price: 220 },
  { name: "Apollo Fish", price: 250 },
  { name: "Fish Pepper", price: 230 },
  { name: "Prawns Chilli", price: 270 },
  { name: "Prawns Ghee Roast", price: 280 },

  { name: "Paneer Butter Masala", price: 220 },
  { name: "Kadai Paneer", price: 220 },
  { name: "Palak Paneer", price: 230 },
  { name: "Mushroom Masala", price: 200 },
  { name: "Veg Kolhapuri", price: 220 },

  { name: "Chicken Fried Rice", price: 165 },
  { name: "Chicken Noodles", price: 160 },
  { name: "Egg Fried Rice", price: 145 },
  { name: "Veg Fried Rice", price: 155 },

  { name: "Butter Chicken", price: 230 },
  { name: "Chicken Hyderabadi", price: 220 },
  { name: "Niku's Special Chicken Curry", price: 240 },
  { name: "Gongura Chicken Curry", price: 230 },
  { name: "Mutton Masala", price: 340 },
  { name: "Mutton Guntur Gravy", price: 350 },
  { name: "Fish Curry", price: 230 },
  { name: "Prawns Curry", price: 280 },

  { name: "Gulab Jamoon", price: 35 },
  { name: "Carrot Halwa", price: 45 },
  { name: "Kheer", price: 45 },
  { name: "Sweet Lassi", price: 50 },
  { name: "Butter Milk", price: 30 },
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
    <section
      id="reservation"
      className="bg-black text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-orange-400 uppercase tracking-[0.25em] sm:tracking-[0.35em] font-black text-xs sm:text-sm">
            Smart Dining System
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mt-6 leading-tight">
            TABLE RESERVATION
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16">
          <div className="bg-white text-black p-5 sm:p-7 md:p-10 rounded-[28px] md:rounded-[40px] shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-black mb-8 md:mb-10">
              Select Table
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
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
                    className={`p-5 sm:p-6 md:p-8 rounded-3xl text-lg sm:text-xl md:text-2xl font-black transition ${
                      booking
                        ? "bg-green-500 text-white"
                        : selectedTable === table
                        ? "bg-orange-500 text-black"
                        : "bg-gray-200 hover:bg-orange-300"
                    }`}
                  >
                    Table {table}

                    <div className="text-xs sm:text-sm mt-3">
                      {booking ? "Booked" : "Available"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showBooking && (
            <div className="bg-orange-500 text-black p-5 sm:p-7 md:p-10 rounded-[28px] md:rounded-[40px] shadow-2xl">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black">
                Reservation Details
              </h3>

              <button
                onClick={() => {
                  setShowBooking(false);
                  setSelectedTable(null);
                }}
                className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-bold"
              >
                ← Back To Tables
              </button>

              <div className="mt-8 md:mt-10 space-y-5 md:space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                  />

                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

                <button
                  onClick={reserveTable}
                  className="w-full bg-black text-white py-4 md:py-5 rounded-2xl text-xl md:text-2xl font-black"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          )}

          {selectedBookedTable && (
            <div className="bg-green-500 text-black p-5 sm:p-7 md:p-10 rounded-[28px] md:rounded-[40px] shadow-2xl">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black">
                Table {selectedBookedTable}
              </h3>

              <button
                onClick={() => setShowItems(!showItems)}
                className="w-full mt-8 md:mt-10 bg-black text-white py-4 md:py-5 rounded-2xl text-xl md:text-2xl font-black"
              >
                Add Items
              </button>

              {showItems && (
                <div className="mt-8 md:mt-10 space-y-4 max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-5"
                    >
                      <div>
                        <p className="text-lg sm:text-xl font-black">
                          {item.name}
                        </p>
                        <p className="text-base sm:text-lg">₹{item.price}</p>
                      </div>

                      {(cart[item.name] || 0) === 0 ? (
                        <button
                          onClick={() => addItem(item.name)}
                          className="bg-black text-white px-5 py-3 rounded-xl font-bold w-full sm:w-auto"
                        >
                          ADD +
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-4 bg-black text-white px-5 py-3 rounded-xl w-full sm:w-auto">
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

                  <div className="bg-black text-white p-5 md:p-6 rounded-2xl mt-8">
                    <p className="text-lg md:text-xl">Subtotal: ₹{subtotal}</p>
                    <p className="text-lg md:text-xl mt-2">
                      GST (5%): ₹{gst.toFixed(2)}
                    </p>

                    <h3 className="text-3xl md:text-4xl font-black text-orange-500 mt-4">
                      Total: ₹{total.toFixed(2)}
                    </h3>
                  </div>
                </div>
              )}

              {!showPayment ? (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full mt-8 md:mt-10 bg-black text-white py-4 md:py-5 rounded-2xl text-xl md:text-2xl font-black"
                >
                  Finish Dining
                </button>
              ) : (
                <div className="mt-8 md:mt-10 bg-white p-5 md:p-8 rounded-3xl">
                  <h3 className="text-3xl md:text-4xl font-black mb-8 text-black">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["UPI", "GPay", "PhonePe", "Cash"].map((method) => (
                      <button
                        key={method}
                        onClick={() =>
                          setPaymentMode(
                            method as "UPI" | "GPay" | "PhonePe" | "Cash"
                          )
                        }
                        className={`px-4 md:px-5 py-4 rounded-xl font-bold ${
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
                      <p className="text-xl md:text-2xl font-black text-black mb-6">
                        Scan QR Code to Pay
                      </p>

                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus%20Andhra%20Kitchen&am=${total.toFixed(
                          2
                        )}&cu=INR`}
                        alt="UPI QR Code"
                        className="mx-auto rounded-2xl border-4 border-black w-[220px] sm:w-[280px]"
                      />

                      <p className="text-black mt-5 text-lg md:text-xl font-bold">
                        UPI ID: nikusandhrakitchen@upi
                      </p>

                      <p className="text-gray-700 mt-2">
                        Supports UPI, GPay and PhonePe
                      </p>

                      <button
                        onClick={completeOnlinePayment}
                        className="mt-8 bg-green-500 text-white px-8 py-4 rounded-xl text-lg md:text-xl font-black"
                      >
                        Payment Completed
                      </button>

                      {paymentDone && (
                        <p className="mt-6 text-2xl md:text-3xl font-black text-green-600">
                          Payment Successful ✓
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-10">
                      <p className="text-xl md:text-2xl font-black text-black">
                        Cash Payment Selected
                      </p>

                      <p className="text-gray-700 mt-3 text-base md:text-lg">
                        Collect cash manually and close the table.
                      </p>

                      <button
                        onClick={() => closeTable("Cash")}
                        className="mt-8 bg-black text-white px-8 py-4 rounded-xl text-lg md:text-xl font-black"
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

        <div className="mt-16 md:mt-24 text-center">
          <button
            onClick={() => setShowClosedDining(!showClosedDining)}
            className="bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-3xl text-xl md:text-2xl font-black shadow-2xl hover:scale-105 transition"
          >
            Closed Dining History
          </button>
        </div>

        {showClosedDining && (
          <div className="mt-10 bg-white text-black p-5 sm:p-7 md:p-10 rounded-[28px] md:rounded-[40px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 md:mb-10">
              Closed Dining History
            </h2>

            {closedDining.length === 0 ? (
              <p className="text-xl md:text-2xl">No Closed Tables Yet</p>
            ) : (
              <div className="space-y-6">
                {closedDining.map((table, index) => (
                  <div key={index} className="bg-gray-100 p-5 md:p-6 rounded-3xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-black">
                          Table {table.table}
                        </h3>

                        <p className="text-lg md:text-xl">
                          Customer: {table.name}
                        </p>

                        <p className="text-lg md:text-xl">
                          Payment: {table.payment}
                        </p>

                        <p className="text-lg md:text-xl">
                          Total: ₹{table.total.toFixed(2)}
                        </p>
                      </div>

                      <div className="bg-green-500 text-white px-6 py-4 rounded-2xl text-lg md:text-xl font-black">
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