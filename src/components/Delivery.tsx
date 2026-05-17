"use client";

import { useState } from "react";

const areas = [
  { name: "Select Your Area", km: 0 },
  { name: "Chambenahalli", km: 1 },
  { name: "Sarjapura Road", km: 3 },
  { name: "Dommasandra", km: 6 },
  { name: "Kodathi", km: 7 },
  { name: "Carmelaram", km: 8 },
  { name: "Bellandur", km: 10 },
  { name: "Whitefield", km: 13 },
];

const deliveryItems = [
  { name: "Hyderabadi Chicken Dum Biryani", price: 230 },
  { name: "Boneless Chicken Biryani", price: 260 },
  { name: "Prawns Biryani", price: 280 },
  { name: "Mutton Dum Biryani", price: 350 },
  { name: "Dragon Chicken", price: 260 },
  { name: "Chicken Kebab", price: 200 },
  { name: "Pepper Chicken", price: 220 },
  { name: "Apollo Fish", price: 250 },
  { name: "Paneer Butter Masala", price: 220 },
  { name: "Chicken Fried Rice", price: 165 },
  { name: "Chicken Noodles", price: 160 },
  { name: "Gulab Jamoon", price: 35 },
];

export default function Delivery() {
  const [selectedArea, setSelectedArea] = useState(areas[0]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addItem = (name: string) => {
    setCart((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
    setPaymentDone(false);
  };

  const removeItem = (name: string) => {
    setCart((prev) => ({
      ...prev,
      [name]: prev[name] > 1 ? prev[name] - 1 : 0,
    }));
    setPaymentDone(false);
  };

  const itemsTotal = deliveryItems.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const deliveryCharge =
    selectedArea.km === 0
      ? 0
      : selectedArea.km <= 5
      ? 0
      : (selectedArea.km - 5) * 15;

  const gst = itemsTotal * 0.05;
  const grandTotal = itemsTotal + gst + deliveryCharge;

  const canShowBill = selectedArea.km > 0 && itemsTotal > 0;

  return (
    <section
      id="delivery"
      className="bg-[#111111] text-white py-16 sm:py-20 md:py-28 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-orange-400 text-xs sm:text-sm font-black">
            Delivery Checkout
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mt-6 leading-tight">
            SELECT FOOD
            <br />
            AUTO BILLING
          </h2>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-8 md:leading-9">
            Select items, choose customer area, and the app automatically
            calculates GST, delivery charge and payment amount.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-16">
          <div className="bg-black border border-orange-500/20 rounded-[28px] md:rounded-[40px] p-5 sm:p-6 md:p-8 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-black text-orange-400 mb-8">
              Select Items
            </h3>

            <div className="space-y-5 max-h-[650px] overflow-y-auto pr-1 sm:pr-2">
              {deliveryItems.map((item) => (
                <div
                  key={item.name}
                  className="bg-white text-black p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div>
                    <h4 className="text-lg sm:text-xl font-black">
                      {item.name}
                    </h4>

                    <p className="text-base sm:text-lg font-bold text-gray-700 mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {(cart[item.name] || 0) === 0 ? (
                    <button
                      onClick={() => addItem(item.name)}
                      className="bg-black text-white px-5 sm:px-6 py-3 rounded-2xl font-black w-full sm:w-auto"
                    >
                      ADD +
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-5 bg-black text-white px-5 py-3 rounded-2xl w-full sm:w-auto">
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-2xl font-black"
                      >
                        -
                      </button>

                      <span className="text-xl font-black">
                        {cart[item.name]}
                      </span>

                      <button
                        onClick={() => addItem(item.name)}
                        className="text-2xl font-black"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-500 text-black rounded-[28px] md:rounded-[40px] p-5 sm:p-7 md:p-10 shadow-2xl">
            <h3 className="text-4xl md:text-5xl font-black">
              Delivery Order
            </h3>

            <label className="block mt-8 md:mt-10 text-lg md:text-xl font-black">
              Select Customer Area
            </label>

            <select
              value={selectedArea.name}
              onChange={(e) => {
                const area = areas.find((a) => a.name === e.target.value);

                if (area) {
                  setSelectedArea(area);
                  setPaymentMethod("");
                  setPaymentDone(false);
                }
              }}
              className="w-full mt-4 p-4 md:p-5 rounded-2xl text-lg md:text-xl font-bold outline-none"
            >
              {areas.map((area) => (
                <option key={area.name} value={area.name}>
                  {area.name}
                </option>
              ))}
            </select>

            {totalItems === 0 && (
              <div className="bg-black text-white rounded-[28px] md:rounded-[35px] p-6 md:p-8 mt-10">
                <p className="text-lg md:text-xl">
                  Add food items to calculate the bill.
                </p>
              </div>
            )}

            {totalItems > 0 && selectedArea.km === 0 && (
              <div className="bg-black text-white rounded-[28px] md:rounded-[35px] p-6 md:p-8 mt-10">
                <p className="text-lg md:text-xl">
                  Select delivery area to calculate delivery charge.
                </p>
              </div>
            )}

            {canShowBill && (
              <>
                <div className="bg-black text-white rounded-[28px] md:rounded-[35px] p-6 md:p-8 mt-10 space-y-5">
                  <h3 className="text-2xl md:text-3xl font-black text-orange-400">
                    Order Summary
                  </h3>

                  {deliveryItems.map(
                    (item) =>
                      cart[item.name] > 0 && (
                        <div
                          key={item.name}
                          className="flex justify-between gap-5 text-base md:text-lg"
                        >
                          <span>
                            {item.name} × {cart[item.name]}
                          </span>

                          <span>₹{item.price * cart[item.name]}</span>
                        </div>
                      )
                  )}

                  <div className="border-t border-white/20 pt-5 space-y-4">
                    <div className="flex justify-between gap-4 text-lg md:text-xl">
                      <span>Area</span>
                      <span className="text-right">{selectedArea.name}</span>
                    </div>

                    <div className="flex justify-between gap-4 text-lg md:text-xl">
                      <span>Distance</span>
                      <span>{selectedArea.km} KM</span>
                    </div>

                    <div className="flex justify-between gap-4 text-lg md:text-xl">
                      <span>Items Total</span>
                      <span>₹{itemsTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between gap-4 text-lg md:text-xl">
                      <span>GST 5%</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between gap-4 text-lg md:text-xl">
                      <span>Delivery Charge</span>
                      <span>
                        {deliveryCharge === 0
                          ? "FREE"
                          : `₹${deliveryCharge.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="border-t border-white/20 pt-5 flex justify-between gap-4 text-2xl sm:text-3xl font-black text-orange-400">
                      <span>Total</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-2xl md:text-3xl font-black">
                    Choose Payment
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                    <button
                      onClick={() => setPaymentMethod("Pay On Delivery")}
                      className={`p-5 rounded-2xl font-black text-base md:text-lg ${
                        paymentMethod === "Pay On Delivery"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      Pay On Delivery
                    </button>

                    <button
                      onClick={() => setPaymentMethod("Online UPI")}
                      className={`p-5 rounded-2xl font-black text-base md:text-lg ${
                        paymentMethod === "Online UPI"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      Online UPI
                    </button>
                  </div>
                </div>

                {paymentMethod === "Online UPI" && (
                  <div className="bg-white rounded-[28px] md:rounded-[35px] p-6 md:p-8 mt-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-black">
                      Scan & Pay
                    </h3>

                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus%20Andhra%20Kitchen&am=${grandTotal.toFixed(
                        2
                      )}&cu=INR`}
                      alt="UPI QR"
                      className="mx-auto mt-8 rounded-3xl border-4 border-black w-[220px] sm:w-[260px]"
                    />

                    <p className="mt-5 text-lg md:text-xl font-black">
                      Amount: ₹{grandTotal.toFixed(2)}
                    </p>

                    <button
                      onClick={() => setPaymentDone(true)}
                      className="w-full mt-8 bg-green-500 text-black py-5 rounded-2xl text-lg md:text-xl font-black"
                    >
                      Payment Completed
                    </button>

                    {paymentDone && (
                      <p className="text-green-700 text-xl md:text-2xl font-black mt-5">
                        Payment Successful ✓
                      </p>
                    )}
                  </div>
                )}

                {paymentMethod === "Pay On Delivery" && (
                  <div className="bg-white rounded-[28px] md:rounded-[35px] p-6 md:p-8 mt-10">
                    <h3 className="text-2xl md:text-3xl font-black">
                      Pay On Delivery Selected
                    </h3>

                    <p className="text-lg md:text-xl mt-5 leading-8 md:leading-9">
                      Customer will pay ₹{grandTotal.toFixed(2)} during
                      delivery.
                    </p>

                    <button
                      onClick={() => setPaymentDone(true)}
                      className="w-full mt-8 bg-black text-white py-5 rounded-2xl text-lg md:text-xl font-black"
                    >
                      Confirm Order
                    </button>

                    {paymentDone && (
                      <p className="text-green-700 text-xl md:text-2xl font-black mt-5">
                        Order Confirmed ✓
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}