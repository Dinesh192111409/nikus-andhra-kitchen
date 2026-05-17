"use client";

import { useState } from "react";

const menuItems = [

  { name: "Hyderabadi Chicken Dum Biryani", price: 230 },
  { name: "Boneless Chicken Biryani", price: 260 },
  { name: "Fry Piece Biryani", price: 230 },
  { name: "Kebab Biryani", price: 230 },
  { name: "Fish Biryani", price: 230 },
  { name: "Gongura Chicken Biryani", price: 240 },
  { name: "Prawns Biryani", price: 280 },
  { name: "Egg Biryani", price: 180 },
  { name: "Mutton Dum Biryani", price: 350 },
  { name: "Nikus Special Biryani", price: 250 },

  { name: "Dragon Chicken", price: 260 },
  { name: "Chicken Kebab", price: 200 },
  { name: "Chicken Lollipop", price: 210 },
  { name: "Pepper Chicken", price: 220 },
  { name: "Chilli Chicken", price: 220 },
  { name: "Apollo Fish", price: 250 },
  { name: "Prawns Ghee Roast", price: 280 },

  { name: "Paneer Butter Masala", price: 220 },
  { name: "Kadai Paneer", price: 220 },
  { name: "Palak Paneer", price: 230 },

  { name: "Butter Chicken", price: 230 },
  { name: "Gongura Chicken Curry", price: 230 },
  { name: "Mutton Masala", price: 340 },

];

export default function Reservation() {

  const tables = [1, 2, 3, 4, 5, 6, 7];

  const [selectedTable, setSelectedTable] =
    useState<number | null>(null);

  const [showBooking, setShowBooking] =
    useState(false);

  const [selectedBookedTable, setSelectedBookedTable] =
    useState<number | null>(null);

  const [showItems, setShowItems] =
    useState(false);

  const [showPayment, setShowPayment] =
    useState(false);

  const [paymentDone, setPaymentDone] =
    useState(false);

  const [cashSelected, setCashSelected] =
    useState(false);

  const [showClosedDining, setShowClosedDining] =
    useState(false);

  const [closedDining, setClosedDining] =
    useState<any[]>([]);

  const [cart, setCart] = useState<
    { [key: string]: number }
  >({});

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

    const newBooking = {
      table: selectedTable,
      name,
      phone,
      date,
      time,
      period,
    };

    setBookedTables((prev) => [
      ...prev,
      newBooking,
    ]);

    alert(
      `Table ${selectedTable} Reserved Successfully`
    );

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
      [name]:
        prev[name] > 0
          ? prev[name] - 1
          : 0,
    }));

  };

  const subtotal = menuItems.reduce(
    (total, item) =>
      total +
      item.price * (cart[item.name] || 0),
    0
  );

  const gst = subtotal * 0.05;

  const total = subtotal + gst;

  const completeOnlinePayment = () => {

    const closedTable =
      bookedTables.find(
        (t) =>
          t.table === selectedBookedTable
      );

    if (closedTable) {

      setClosedDining((prev) => [
        ...prev,
        {
          ...closedTable,
          total,
          payment: "Online",
        },
      ]);

    }

    setPaymentDone(true);

    setTimeout(() => {

      setBookedTables((prev) =>
        prev.filter(
          (t) =>
            t.table !== selectedBookedTable
        )
      );

      setSelectedBookedTable(null);

      setCart({});

      setShowPayment(false);

      setPaymentDone(false);

    }, 3000);

  };

  const closeCashPayment = () => {

    const closedTable =
      bookedTables.find(
        (t) =>
          t.table === selectedBookedTable
      );

    if (closedTable) {

      setClosedDining((prev) => [
        ...prev,
        {
          ...closedTable,
          total,
          payment: "Cash",
        },
      ]);

    }

    setBookedTables((prev) =>
      prev.filter(
        (t) =>
          t.table !== selectedBookedTable
      )
    );

    setSelectedBookedTable(null);

    setCart({});

    setShowPayment(false);

    setCashSelected(false);

  };

  return (

    <section
      id="reservation"
      className="bg-black text-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <h2 className="text-6xl font-black">
            TABLE RESERVATION
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-16">

          {/* TABLES */}

          <div className="bg-white text-black p-10 rounded-[40px]">

            <h3 className="text-4xl font-black mb-10">
              Select Table
            </h3>

            <div className="grid grid-cols-2 gap-6">

              {tables.map((table) => {

                const booking =
                  bookedTables.find(
                    (t) => t.table === table
                  );

                return (

                  <button
                    key={table}
                    onClick={() => {

                      if (booking) {
                        setSelectedBookedTable(table);
                      } else {
                        setSelectedTable(table);
                        setShowBooking(true);
                      }

                    }}
                    className={`
                      p-8 rounded-3xl text-2xl font-black transition

                      ${
                        booking
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 hover:bg-orange-300"
                      }
                    `}
                  >

                    Table {table}

                    <div className="text-sm mt-3">

                      {booking
                        ? "Booked"
                        : "Available"}

                    </div>

                  </button>

                );
              })}

            </div>

          </div>

          {/* BOOK FORM */}

          {showBooking && (

            <div className="bg-orange-500 text-black p-10 rounded-[40px]">

              <h3 className="text-5xl font-black">
                Reservation Details
              </h3>

              <div className="mt-10 space-y-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full p-5 rounded-2xl text-xl"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full p-5 rounded-2xl text-xl"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="w-full p-5 rounded-2xl text-xl"
                />

                <div className="flex gap-4">

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="w-full p-5 rounded-2xl text-xl"
                  />

                  <select
                    value={period}
                    onChange={(e) =>
                      setPeriod(e.target.value)
                    }
                    className="p-5 rounded-2xl text-xl"
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

          {/* BOOKED TABLE */}

          {selectedBookedTable && (

            <div className="bg-green-500 text-black p-10 rounded-[40px]">

              <h3 className="text-5xl font-black">
                Table {selectedBookedTable}
              </h3>

              <button
                onClick={() =>
                  setShowItems(!showItems)
                }
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

                        <p className="text-2xl font-black">
                          {item.name}
                        </p>

                        <p className="text-lg">
                          ₹{item.price}
                        </p>

                      </div>

                      {(cart[item.name] || 0) === 0 ? (

                        <button
                          onClick={() =>
                            addItem(item.name)
                          }
                          className="bg-black text-white px-6 py-3 rounded-xl font-bold"
                        >

                          ADD +

                        </button>

                      ) : (

                        <div className="flex items-center gap-4 bg-black text-white px-5 py-3 rounded-xl">

                          <button
                            onClick={() =>
                              removeItem(item.name)
                            }
                            className="text-2xl font-bold"
                          >

                            -

                          </button>

                          <span className="text-xl font-bold">
                            {cart[item.name]}
                          </span>

                          <button
                            onClick={() =>
                              addItem(item.name)
                            }
                            className="text-2xl font-bold"
                          >

                            +

                          </button>

                        </div>

                      )}

                    </div>

                  ))}

                  <div className="bg-black text-white p-6 rounded-2xl mt-8">

                    <p className="text-xl">
                      Subtotal: ₹{subtotal}
                    </p>

                    <p className="text-xl mt-2">
                      GST (5%): ₹{gst.toFixed(2)}
                    </p>

                    <h3 className="text-4xl font-black text-orange-500 mt-4">
                      Total: ₹{total.toFixed(2)}
                    </h3>

                  </div>

                </div>

              )}

              {!showPayment ? (

                <button
                  onClick={() =>
                    setShowPayment(true)
                  }
                  className="w-full mt-10 bg-black text-white py-5 rounded-2xl text-2xl font-black"
                >

                  Finish Dining

                </button>

              ) : (

                <div className="mt-10 bg-white p-8 rounded-3xl">

                  <h3 className="text-4xl font-black mb-8 text-black">
                    Payment Method
                  </h3>

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        setCashSelected(false)
                      }
                      className="bg-black text-white px-6 py-4 rounded-xl font-bold"
                    >

                      Online Payment

                    </button>

                    <button
                      onClick={() =>
                        setCashSelected(true)
                      }
                      className="bg-orange-500 text-black px-6 py-4 rounded-xl font-bold"
                    >

                      Cash

                    </button>

                  </div>

                  {!cashSelected ? (

                    <div className="mt-10 text-center">

                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=NikusAndhraKitchenPayment"
                        alt="QR"
                        className="mx-auto rounded-2xl"
                      />

                      <button
                        onClick={
                          completeOnlinePayment
                        }
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

                      <button
                        onClick={closeCashPayment}
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

        {/* CLOSED DINING BUTTON */}

        <div className="mt-24 text-center">

          <button
            onClick={() =>
              setShowClosedDining(!showClosedDining)
            }
            className="bg-white text-black px-10 py-5 rounded-3xl text-2xl font-black shadow-2xl hover:scale-105 transition"
          >

            Closed Dining History

          </button>

        </div>

        {/* CLOSED DINING HISTORY */}

        {showClosedDining && (

          <div className="mt-10 bg-white text-black p-10 rounded-[40px]">

            <h2 className="text-5xl font-black mb-10">
              Closed Dining History
            </h2>

            {closedDining.length === 0 ? (

              <p className="text-2xl">
                No Closed Tables Yet
              </p>

            ) : (

              <div className="space-y-6">

                {closedDining.map((table, index) => (

                  <div
                    key={index}
                    className="bg-gray-100 p-6 rounded-3xl"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                      <div className="space-y-2">

                        <h3 className="text-3xl font-black">
                          Table {table.table}
                        </h3>

                        <p className="text-xl">
                          Customer: {table.name}
                        </p>

                        <p className="text-xl">
                          Payment: {table.payment}
                        </p>

                        <p className="text-xl">
                          Total:
                          {" "}
                          ₹{table.total.toFixed(2)}
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