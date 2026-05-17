export default function Delivery() {
  return (

    <section
      id="delivery"
      className="bg-black text-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <div>

          <p className="uppercase tracking-[0.3em] text-orange-400 font-bold">
            Fast Delivery
          </p>

          <h2 className="text-6xl font-black mt-6 leading-tight">
            FREE DELIVERY
            <br />
            UPTO 5 KM
          </h2>

          <p className="text-gray-300 text-xl mt-8 leading-9">
            Enjoy hot and fresh Andhra style biryanis,
            curries and starters delivered directly
            to your doorstep with premium packaging
            and fast delivery service.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-orange-500 text-black p-5 rounded-2xl font-bold text-xl">
              ✅ Free Delivery upto 5 KM
            </div>

            <div className="bg-orange-500 text-black p-5 rounded-2xl font-bold text-xl">
              ✅ Extra Charges after 5 KM
            </div>

            <div className="bg-orange-500 text-black p-5 rounded-2xl font-bold text-xl">
              ✅ Live Order Tracking
            </div>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200"
            alt="Delivery"
            className="rounded-[40px] shadow-2xl"
          />

        </div>

      </div>

    </section>

  );
}