export default function Hero() {

  return (

    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center bg-black"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/65"></div>

      {/* GRADIENT OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-36 pb-20 w-full">

        <div className="max-w-4xl">

          {/* TAG */}

          <div className="inline-flex glass rounded-full px-6 py-3 border border-orange-500/20">

            <p className="text-orange-400 uppercase tracking-[0.4em] font-black text-xs md:text-sm">

              Authentic Andhra Dining

            </p>

          </div>

          {/* TITLE */}

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mt-10">

            ANDHRA
            <br />

            <span className="text-orange-500">
              FLAVOURS
            </span>

          </h1>

          {/* SUBTITLE */}

          <p className="text-orange-200 text-xl md:text-2xl tracking-[0.3em] mt-8 font-bold">

            SPICE • TRADITION • TASTE

          </p>

          {/* DESCRIPTION */}

          <p className="max-w-2xl text-white/90 text-lg md:text-2xl mt-10 leading-9">

            Experience bold Andhra recipes crafted with premium ingredients,
            authentic spices and rich traditional flavours at
            Nikus Andhra Kitchen.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-6 mt-14">

            <a
              href="#menu"
              className="orange-gradient text-black px-10 py-5 rounded-2xl font-black text-lg shadow-premium hover-scale"
            >

              EXPLORE MENU

            </a>

            <a
              href="#reservation"
              className="glass border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-black"
            >

              RESERVE TABLE

            </a>

            <a
              href="tel:+918904205500"
              className="border border-orange-500 text-orange-400 px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-500 hover:text-black"
            >

              CALL NOW

            </a>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

            <div className="glass rounded-[30px] p-6 text-center shadow-premium">

              <h3 className="text-4xl font-black text-orange-400">
                7
              </h3>

              <p className="text-sm uppercase tracking-widest mt-3 text-gray-300">

                Dining Tables

              </p>

            </div>

            <div className="glass rounded-[30px] p-6 text-center shadow-premium">

              <h3 className="text-4xl font-black text-orange-400">
                5KM
              </h3>

              <p className="text-sm uppercase tracking-widest mt-3 text-gray-300">

                Free Delivery

              </p>

            </div>

            <div className="glass rounded-[30px] p-6 text-center shadow-premium">

              <h3 className="text-4xl font-black text-orange-400">
                24+
              </h3>

              <p className="text-sm uppercase tracking-widest mt-3 text-gray-300">

                Premium Dishes

              </p>

            </div>

            <div className="glass rounded-[30px] p-6 text-center shadow-premium">

              <h3 className="text-4xl font-black text-orange-400">
                5%
              </h3>

              <p className="text-sm uppercase tracking-widest mt-3 text-gray-300">

                GST Billing

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}