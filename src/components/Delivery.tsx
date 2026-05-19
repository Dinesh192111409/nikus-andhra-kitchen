"use client";

import { useState } from "react";
import Image from "next/image";
import { getActiveMenuItems } from "../utils/menu";
import type { MenuItem } from "../data/menuItems";
import { saveOrder } from "../utils/orders";

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

const createDeliveryOrderId = () => crypto.randomUUID();

export default function Delivery() {
  const [items] = useState<MenuItem[]>(() => getActiveMenuItems());
  const [orderType, setOrderType] = useState<"Delivery" | "Pickup">("Delivery");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [locationLink, setLocationLink] = useState("");

  const [selectedArea, setSelectedArea] = useState(areas[0]);
  const [containerCharge, setContainerCharge] = useState("0");
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

  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Location sharing is not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;

        setLocationLink(link);

        alert("Location added successfully");
      },
      () => {
        alert("Location permission denied");
      },
    );
  };

  const itemsTotal = items.reduce((total, item) => {
    return total + item.price * (cart[item.name] || 0);
  }, 0);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const deliveryCharge =
    orderType === "Pickup"
      ? 0
      : selectedArea.km === 0
        ? 0
        : selectedArea.km <= 5
          ? 0
          : (selectedArea.km - 5) * 15;

  const packingCharge = Number(containerCharge) || 0;

  const gst = itemsTotal * 0.05;

  const grandTotal = itemsTotal + gst + deliveryCharge + packingCharge;

  const canShowBill =
    totalItems > 0 &&
    customerName.trim() !== "" &&
    phone.trim() !== "" &&
    (orderType === "Pickup" ||
      (selectedArea.km > 0 && address.trim() !== ""));

  const saveDeliveryOrder = (payment: string) => {
    saveOrder({
      id: createDeliveryOrderId(),
      type: "delivery",
      customer: customerName,
      phone,
      items: [
        `Order Type: ${orderType}`,
        ...items
          .filter((item) => cart[item.name] > 0)
          .map((item) => `${item.name} x ${cart[item.name]}`),
        orderType === "Delivery"
          ? `Address: ${address}`
          : "Pickup from restaurant",
        locationLink ? `Location: ${locationLink}` : "Location: Not shared",
        `Container Charge: ₹${packingCharge.toFixed(2)}`,
      ],
      subtotal: itemsTotal,
      gst,
      deliveryCharge,
      total: grandTotal,
      payment,
      status: "Pending",
      date: new Date().toLocaleString(),
    });
  };

  return (
    <section
      id="delivery"
      className="bg-[#111111] text-white py-16 sm:py-20 md:py-28 px-3 sm:px-6 overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="uppercase tracking-[0.18em] sm:tracking-[0.4em] text-orange-400 text-[10px] sm:text-sm font-black">
            Delivery & Pickup
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mt-6 leading-tight break-words">
            SELECT FOOD
            <br />
            AUTO BILLING
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-xl mt-8 max-w-3xl mx-auto leading-7 md:leading-9">
            Customer can choose delivery or pickup, add address, share location,
            select food and complete payment.
          </p>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 md:gap-12 xl:gap-16 items-start">
          <div className="bg-black border border-orange-500/20 rounded-[28px] md:rounded-[40px] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-400 mb-8">
              Select Items
            </h3>

            <div className="space-y-5 max-h-[650px] overflow-y-auto pr-1 sm:pr-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white text-black p-4 sm:p-5 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-5 overflow-hidden"
                >
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-xl font-black break-words">
                      {item.name}
                    </h4>

                    <p className="text-base sm:text-lg font-bold text-gray-700 mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {(cart[item.name] || 0) === 0 ? (
                    <button
                      onClick={() => addItem(item.name)}
                      className="bg-black text-white px-5 sm:px-6 py-3 rounded-2xl font-black w-full lg:w-auto"
                    >
                      ADD +
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-5 bg-black text-white px-5 py-3 rounded-2xl w-full lg:w-auto">
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

          <div className="bg-orange-500 text-black rounded-[28px] md:rounded-[40px] p-4 sm:p-7 md:p-10 shadow-2xl overflow-hidden">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black break-words">
              Order Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => {
                  setOrderType("Delivery");
                  setPaymentDone(false);
                }}
                className={`p-5 rounded-2xl font-black ${
                  orderType === "Delivery"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Delivery
              </button>

              <button
                onClick={() => {
                  setOrderType("Pickup");
                  setPaymentDone(false);
                }}
                className={`p-5 rounded-2xl font-black ${
                  orderType === "Pickup"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Pickup
              </button>
            </div>

            <div className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-4 md:p-5 rounded-2xl text-base md:text-xl font-bold outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 md:p-5 rounded-2xl text-base md:text-xl font-bold outline-none"
              />

              {orderType === "Delivery" && (
                <>
                  <textarea
                    placeholder="Full Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-4 md:p-5 rounded-2xl text-base md:text-xl font-bold outline-none min-h-[120px]"
                  />

                  <button
                    onClick={shareLocation}
                    className="w-full bg-white text-black py-4 rounded-2xl font-black"
                  >
                    Share Current Location
                  </button>

                  {locationLink && (
                    <a
                      href={locationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-black text-white p-4 rounded-2xl text-center font-black break-words"
                    >
                      View Shared Location
                    </a>
                  )}

                  <label className="block text-base md:text-xl font-black">
                    Select Customer Area
                  </label>

                  <select
                    value={selectedArea.name}
                    onChange={(e) => {
                      const area = areas.find(
                        (a) => a.name === e.target.value,
                      );

                      if (area) {
                        setSelectedArea(area);
                        setPaymentMethod("");
                        setPaymentDone(false);
                      }
                    }}
                    className="w-full p-4 md:p-5 rounded-2xl text-base md:text-xl font-bold outline-none"
                  >
                    {areas.map((area) => (
                      <option key={area.name} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </>
              )}

              <input
                type="number"
                placeholder="Container / Packing Charge"
                value={containerCharge}
                onChange={(e) => setContainerCharge(e.target.value)}
                className="w-full p-4 md:p-5 rounded-2xl text-base md:text-xl font-bold outline-none"
              />
            </div>

            {!canShowBill && (
              <div className="bg-black text-white rounded-[28px] md:rounded-[35px] p-5 md:p-8 mt-10">
                <p className="text-base md:text-xl">
                  Add items, customer name, phone and required details to
                  continue.
                </p>
              </div>
            )}

            {canShowBill && (
              <>
                <div className="bg-black text-white rounded-[28px] md:rounded-[35px] p-5 md:p-8 mt-10 space-y-5 overflow-hidden">
                  <h3 className="text-2xl md:text-3xl font-black text-orange-400">
                    Order Summary
                  </h3>

                  {items.map(
                    (item) =>
                      cart[item.name] > 0 && (
                        <div
                          key={item.id}
                          className="flex flex-wrap justify-between gap-3 text-base md:text-lg"
                        >
                          <span className="break-words">
                            {item.name} × {cart[item.name]}
                          </span>

                          <span>₹{item.price * cart[item.name]}</span>
                        </div>
                      ),
                  )}

                  <div className="border-t border-white/20 pt-5 space-y-4">
                    <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                      <span>Type</span>
                      <span>{orderType}</span>
                    </div>

                    {orderType === "Delivery" && (
                      <>
                        <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                          <span>Area</span>

                          <span className="text-right">
                            {selectedArea.name}
                          </span>
                        </div>

                        <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                          <span>Distance</span>
                          <span>{selectedArea.km} KM</span>
                        </div>
                      </>
                    )}

                    <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                      <span>Items Total</span>
                      <span>₹{itemsTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                      <span>GST 5%</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                      <span>Container Charge</span>
                      <span>₹{packingCharge.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-wrap justify-between gap-3 text-base md:text-xl">
                      <span>Delivery Charge</span>

                      <span>
                        {deliveryCharge === 0
                          ? "FREE"
                          : `₹${deliveryCharge.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="border-t border-white/20 pt-5 flex flex-wrap justify-between gap-4 text-xl sm:text-3xl font-black text-orange-400">
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
                      onClick={() => {
                        setPaymentMethod("Pay On Delivery");
                        setPaymentDone(false);
                      }}
                      className={`p-5 rounded-2xl font-black text-base md:text-lg ${
                        paymentMethod === "Pay On Delivery"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      Pay On Delivery
                    </button>

                    <button
                      onClick={() => {
                        setPaymentMethod("Online UPI");
                        setPaymentDone(false);
                      }}
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
                  <div className="bg-white rounded-[28px] md:rounded-[35px] p-5 md:p-8 mt-10 text-center overflow-hidden">
                    <h3 className="text-2xl md:text-3xl font-black">
                      Scan & Pay
                    </h3>

                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=upi://pay?pa=nikusandhrakitchen@upi&pn=Nikus%20Andhra%20Kitchen&am=${grandTotal.toFixed(
                        2,
                      )}&cu=INR`}
                      alt="UPI QR"
                      width={260}
                      height={260}
                      className="mx-auto mt-8 rounded-3xl border-4 border-black w-full max-w-[260px] h-auto"
                    />

                    <p className="mt-5 text-base md:text-xl font-black">
                      Amount: ₹{grandTotal.toFixed(2)}
                    </p>

                    <button
                      onClick={() => {
                        saveDeliveryOrder("Online UPI");
                        setPaymentDone(true);
                      }}
                      className="w-full mt-8 bg-green-500 text-black py-5 rounded-2xl text-base md:text-xl font-black"
                    >
                      Payment Completed
                    </button>

                    {paymentDone && (
                      <p className="text-green-700 text-lg md:text-2xl font-black mt-5">
                        Payment Successful ✓ Order sent to owner dashboard.
                      </p>
                    )}
                  </div>
                )}

                {paymentMethod === "Pay On Delivery" && (
                  <div className="bg-white rounded-[28px] md:rounded-[35px] p-5 md:p-8 mt-10 overflow-hidden">
                    <h3 className="text-2xl md:text-3xl font-black">
                      Pay On Delivery Selected
                    </h3>

                    <p className="text-base md:text-xl mt-5 leading-7 md:leading-9">
                      Customer will pay ₹{grandTotal.toFixed(2)} during{" "}
                      {orderType.toLowerCase()}.
                    </p>

                    <button
                      onClick={() => {
                        saveDeliveryOrder("Pay On Delivery");
                        setPaymentDone(true);
                      }}
                      className="w-full mt-8 bg-black text-white py-5 rounded-2xl text-base md:text-xl font-black"
                    >
                      Confirm Order
                    </button>

                    {paymentDone && (
                      <p className="text-green-700 text-lg md:text-2xl font-black mt-5">
                        Order Confirmed ✓ Sent to owner dashboard.
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