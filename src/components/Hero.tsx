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
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 pb-16 md:pb-20 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex glass rounded-full px-4 sm:px-6 py-3 border border-orange-500/20">
            <p className="text-orange-400 uppercase tracking-[0.2em] sm:tracking-[0.4em] font-black text-[10px] sm:text-xs md:text-sm">
              Authentic Andhra Dining
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] mt-8 md:mt-10">
            ANDHRA
            <br />
            <span className="text-orange-500">
              FLAVOURS
            </span>
          </h1>

          <p className="text-orange-200 text-base sm:text-xl md:text-2xl tracking-[0.15em] sm:tracking-[0.3em] mt-6 md:mt-8 font-bold">
            SPICE • TRADITION • TASTE
          </p>

          <p className="max-w-2xl text-white/90 text-base sm:text-lg md:text-2xl mt-8 md:mt-10 leading-8 md:leading-9">
            Experience bold Andhra recipes crafted with premium ingredients,
            authentic spices and rich traditional flavours at Nikus Andhra
            Kitchen.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-10 md:mt-14">
            <a
              href="#menu"
              className="orange-gradient text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg shadow-premium hover-scale text-center"
            >
              EXPLORE MENU
            </a>

            <a
              href="#reservation"
              className="glass border border-white/10 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-white hover:text-black text-center"
            >
              RESERVE TABLE
            </a>

            <a
              href="tel:+918904205500"
              className="border border-orange-500 text-orange-400 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-orange-500 hover:text-black text-center"
            >
              CALL NOW
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20">
            <div className="glass rounded-[24px] md:rounded-[30px] p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-3xl md:text-4xl font-black text-orange-400">
                7
              </h3>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                Dining Tables
              </p>
            </div>

            <div className="glass rounded-[24px] md:rounded-[30px] p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-3xl md:text-4xl font-black text-orange-400">
                5KM
              </h3>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                Free Delivery
              </p>
            </div>

            <div className="glass rounded-[24px] md:rounded-[30px] p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-3xl md:text-4xl font-black text-orange-400">
                24+
              </h3>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                Premium Dishes
              </p>
            </div>

            <div className="glass rounded-[24px] md:rounded-[30px] p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-3xl md:text-4xl font-black text-orange-400">
                5%
              </h3>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                GST Billing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}