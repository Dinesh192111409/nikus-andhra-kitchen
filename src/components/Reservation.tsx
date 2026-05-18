"use client";

import { useState } from "react";
import Image from "next/image";
import { getActiveMenuItems } from "../utils/menu";
import type { MenuItem } from "../data/menuItems";
import { saveOrder } from "../utils/orders";

type Booking = {
  table: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  period: string;
};

type ClosedDining = Booking & {
  items: string[];
  subtotal: number;
  gst: number;
  total: number;
  payment: string;
};

const createReservationOrderId = (prefix: string) =>
  `${prefix}-${crypto.randomUUID()}`;

export default function Reservation() {
  const [items] = useState<MenuItem[]>(() => getActiveMenuItems());

  const tables = [1, 2, 3, 4, 5, 6, 7];

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [selectedBookedTable, setSelectedBookedTable] = useState<number | null>(
    null
  );

  const [showBooking, setShowBooking] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showKOT, setShowKOT] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const [paymentMode, setPaymentMode] = useState<
    "UPI" | "GPay" | "PhonePe" | "Cash"
  >("UPI");

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [closedDining, setClosedDining] = useState<ClosedDining[]>([]);
  const [showClosedDining, setShowClosedDining] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [period, setPeriod] = useState("PM");

  const [bookedTables, setBookedTables] = useState<Booking[]>([]);

  const selectedBooking = bookedTables.find(
    (table) => table.table === selectedBookedTable
  );

  const subtotal = items.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const gst = subtotal * 0.05;
  const total = subtotal + gst;
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const orderedItems = items
    .filter((item) => cart[item.name] > 0)
    .map((item) => `${item.name} x ${cart[item.name]}`);

  const upiLink = `upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus%20Andhra%20Kitchen&am=${total.toFixed(
    2
  )}&cu=INR`;

  const reserveTable = () => {
    if (!selectedTable) return;

    if (!name || !phone || !date || !time) {
      alert("Please fill name, phone, date and time");
      return;
    }

    const newBooking = {
      table: selectedTable,
      name,
      phone,
      date,
      time,
      period,
    };

    setBookedTables((prev) => [...prev, newBooking]);

    saveOrder({
      id: createReservationOrderId("reservation"),
      type: "reservation",
      customer: name,
      phone,
      items: [
        `Table ${selectedTable} reserved`,
        `Date: ${date}`,
        `Time: ${time} ${period}`,
      ],
      subtotal: 0,
      gst: 0,
      total: 0,
      payment: "Reservation only",
      status: "Pending",
      date: new Date().toLocaleString("en-IN"),
    });

    alert(`Table ${selectedTable} reserved successfully`);

    setSelectedTable(null);
    setShowBooking(false);
    setName("");
    setPhone("");
    setDate("");
    setTime("");
  };

  const addItem = (itemName: string) => {
    setCart((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
  };

  const removeItem = (itemName: string) => {
    setCart((prev) => {
      const updated = { ...prev };

      if (updated[itemName] > 1) {
        updated[itemName] -= 1;
      } else {
        delete updated[itemName];
      }

      return updated;
    });
  };

  const closeTable = (payment: string) => {
    if (!selectedBooking) return;

    saveOrder({
      id: createReservationOrderId("dining"),
      type: "reservation",
      customer: selectedBooking.name,
      phone: selectedBooking.phone,
      items: [
        `Dining Table ${selectedBooking.table}`,
        `Reservation Date: ${selectedBooking.date}`,
        `Reservation Time: ${selectedBooking.time} ${selectedBooking.period}`,
        ...orderedItems,
      ],
      subtotal,
      gst,
      total,
      payment,
      status: "Pending",
      date: new Date().toLocaleString("en-IN"),
    });

    setClosedDining((prev) => [
      ...prev,
      {
        ...selectedBooking,
        items: orderedItems,
        subtotal,
        gst,
        total,
        payment,
      },
    ]);

    setBookedTables((prev) =>
      prev.filter((table) => table.table !== selectedBookedTable)
    );

    setSelectedBookedTable(null);
    setSelectedTable(null);
    setCart({});
    setShowMenu(false);
    setShowKOT(false);
    setShowBill(false);
    setPaymentDone(false);
  };

  const completeOnlinePayment = () => {
    setPaymentDone(true);

    setTimeout(() => {
      closeTable(`${paymentMode} Online`);
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
            Restaurant POS Table Service
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mt-6 leading-tight">
            DINE-IN TABLE ORDERING
          </h2>

          <p className="text-gray-300 mt-5 text-base sm:text-lg font-semibold">
            Reserve table, add food, generate KOT, collect payment and close
            table.
          </p>
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
                        setShowMenu(true);
                        setShowKOT(false);
                        setShowBill(false);
                      } else {
                        setSelectedTable(table);
                        setSelectedBookedTable(null);
                        setShowBooking(true);
                        setShowMenu(false);
                        setShowKOT(false);
                        setShowBill(false);
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
                      {booking ? "Running Order" : "Available"}
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
                  placeholder="Customer Name"
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

          {selectedBooking && showMenu && (
            <div className="bg-green-500 text-black p-5 sm:p-7 md:p-10 rounded-[28px] md:rounded-[40px] shadow-2xl">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black">
                Table {selectedBooking.table}
              </h3>

              <div className="bg-white p-5 rounded-2xl mt-6">
                <p className="font-black text-xl">
                  Customer: {selectedBooking.name}
                </p>
                <p className="font-bold mt-2">
                  Phone: {selectedBooking.phone}
                </p>
                <p className="font-bold mt-2">
                  Time: {selectedBooking.date}, {selectedBooking.time}{" "}
                  {selectedBooking.period}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => {
                    setShowKOT(false);
                    setShowBill(false);
                  }}
                  className="bg-black text-white px-6 py-4 rounded-2xl font-black"
                >
                  Menu
                </button>

                <button
                  onClick={() => {
                    if (totalItems === 0) {
                      alert("Add items first");
                      return;
                    }

                    setShowKOT(true);
                    setShowBill(false);
                  }}
                  className="bg-white text-black px-6 py-4 rounded-2xl font-black"
                >
                  Show KOT
                </button>

                <button
                  onClick={() => {
                    if (totalItems === 0) {
                      alert("Add items first");
                      return;
                    }

                    setShowBill(true);
                    setShowKOT(false);
                  }}
                  className="bg-orange-500 text-black px-6 py-4 rounded-2xl font-black"
                >
                  Pay Bill
                </button>
              </div>

              {!showKOT && !showBill && (
                <div className="mt-8 space-y-4 max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
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
                </div>
              )}

              {showKOT && (
                <div className="bg-white text-black p-6 rounded-3xl mt-8">
                  <h3 className="text-4xl font-black">KOT</h3>

                  <p className="font-bold mt-3">
                    Table: {selectedBooking.table}
                  </p>

                  <p className="font-bold mt-1">
                    Customer: {selectedBooking.name}
                  </p>

                  <div className="mt-6 space-y-3">
                    {items.map(
                      (item) =>
                        cart[item.name] > 0 && (
                          <div
                            key={item.id}
                            className="flex justify-between text-lg font-bold"
                          >
                            <span>
                              {item.name} x {cart[item.name]}
                            </span>
                            <span>Qty: {cart[item.name]}</span>
                          </div>
                        )
                    )}
                  </div>

                  <button
                    onClick={() => setShowBill(true)}
                    className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-black"
                  >
                    Go To Bill
                  </button>
                </div>
              )}

              {showBill && (
                <div className="bg-white text-black p-6 rounded-3xl mt-8">
                  <h3 className="text-4xl font-black">Bill Summary</h3>

                  <div className="mt-6 space-y-3">
                    {items.map(
                      (item) =>
                        cart[item.name] > 0 && (
                          <div
                            key={item.id}
                            className="flex justify-between text-lg"
                          >
                            <span>
                              {item.name} x {cart[item.name]}
                            </span>
                            <span>₹{item.price * cart[item.name]}</span>
                          </div>
                        )
                    )}
                  </div>

                  <div className="border-t border-black/20 mt-6 pt-6 space-y-3 text-xl">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST 5%</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-3xl font-black text-orange-500">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <h4 className="text-2xl font-black mt-8">Payment</h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                    {["UPI", "GPay", "PhonePe", "Cash"].map((method) => (
                      <button
                        key={method}
                        onClick={() =>
                          setPaymentMode(
                            method as "UPI" | "GPay" | "PhonePe" | "Cash"
                          )
                        }
                        className={`py-4 rounded-xl font-black ${
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
                    <div className="mt-8 text-center">
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
                          upiLink
                        )}`}
                        alt="UPI QR Code"
                        width={260}
                        height={260}
                        className="mx-auto rounded-2xl border-4 border-black w-[220px] sm:w-[260px]"
                      />

                      <a
                        href={upiLink}
                        className="block mt-6 bg-black text-white py-4 rounded-2xl font-black"
                      >
                        Open {paymentMode} / UPI App
                      </a>

                      <button
                        onClick={completeOnlinePayment}
                        className="w-full mt-5 bg-green-500 text-white py-4 rounded-2xl font-black"
                      >
                        I Have Paid
                      </button>

                      {paymentDone && (
                        <p className="mt-5 text-green-700 text-2xl font-black">
                          Payment Successful ✓ Table closing...
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-8">
                      <p className="text-xl font-black">
                        Cash selected. Collect payment manually.
                      </p>

                      <button
                        onClick={() => closeTable("Cash")}
                        className="w-full mt-5 bg-black text-white py-4 rounded-2xl font-black"
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
                  <div
                    key={index}
                    className="bg-gray-100 p-5 md:p-6 rounded-3xl"
                  >
                    <h3 className="text-2xl md:text-3xl font-black">
                      Table {table.table}
                    </h3>

                    <p className="text-lg md:text-xl mt-2">
                      Customer: {table.name}
                    </p>

                    <p className="text-lg md:text-xl">
                      Payment: {table.payment}
                    </p>

                    <p className="text-lg md:text-xl">
                      Total: ₹{table.total.toFixed(2)}
                    </p>

                    <div className="bg-green-500 text-white px-6 py-4 rounded-2xl text-lg md:text-xl font-black mt-5 inline-block">
                      Dining Closed ✓
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
