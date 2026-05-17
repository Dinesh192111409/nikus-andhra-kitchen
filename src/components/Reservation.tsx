"use client";

import { useEffect, useState } from "react";
import { getActiveMenuItems } from "../utils/menu";
import type { MenuItem } from "../data/menuItems";

export default function Reservation() {

  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setItems(getActiveMenuItems());
  }, []);

  const tables = [1, 2, 3, 4, 5, 6, 7];

  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const [showBooking, setShowBooking] = useState(false);

  const [selectedBookedTable, setSelectedBookedTable] =
    useState<number | null>(null);

  const [showItems, setShowItems] = useState(false);

  const [showPayment, setShowPayment] = useState(false);

  const [paymentDone, setPaymentDone] = useState(false);

  const [paymentMode, setPaymentMode] =
    useState<"UPI" | "GPay" | "PhonePe" | "Cash">("UPI");

  const [showClosedDining, setShowClosedDining] =
    useState(false);

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

  const subtotal = items.reduce((total, item) => {
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
      prev.filter(
        (table) => table.table !== selectedBookedTable
      )
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

                const booking = bookedTables.find(
                  (t) => t.table === table
                );

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
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                />

                <div className="flex flex-col sm:flex-row gap-4">

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="w-full p-4 md:p-5 rounded-2xl text-base sm:text-lg md:text-xl outline-none"
                  />

                  <select
                    value={period}
                    onChange={(e) =>
                      setPeriod(e.target.value)
                    }
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

        </div>

      </div>

    </section>

  );
}