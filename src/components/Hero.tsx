export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center bg-black w-full"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 md:pb-20">
        <div className="max-w-5xl">
          <div className="inline-flex glass rounded-full px-4 sm:px-6 py-3 border border-orange-500/20 max-w-full">
            <p className="text-orange-400 uppercase tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.4em] font-black text-[9px] sm:text-xs md:text-sm text-center">
              Authentic Andhra Dining
            </p>
          </div>

          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] mt-7 md:mt-10 break-words">
            ANDHRA
            <br />
            <span className="text-orange-500">FLAVOURS</span>
          </h1>

          <p className="text-orange-200 text-sm sm:text-lg md:text-xl lg:text-2xl tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.3em] mt-5 md:mt-7 font-bold break-words">
            SPICE • TRADITION • TASTE
          </p>

          <p className="max-w-3xl text-white/90 text-sm sm:text-base md:text-xl lg:text-2xl mt-7 md:mt-10 leading-7 md:leading-9">
            Experience bold Andhra recipes crafted with premium ingredients,
            authentic spices and rich traditional flavours at Nikus Andhra
            Kitchen.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 md:gap-6 mt-10 md:mt-14 w-full">
            <a
              href="#menu"
              className="orange-gradient text-black px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-sm sm:text-base md:text-lg shadow-premium hover-scale text-center w-full sm:w-auto"
            >
              EXPLORE MENU
            </a>

            <a
              href="#reservation"
              className="glass border border-white/10 text-white px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-sm sm:text-base md:text-lg hover:bg-white hover:text-black text-center w-full sm:w-auto"
            >
              RESERVE TABLE
            </a>

            <a
              href="tel:+918904205500"
              className="border border-orange-500 text-orange-400 px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-sm sm:text-base md:text-lg hover:bg-orange-500 hover:text-black text-center w-full sm:w-auto"
            >
              CALL NOW
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20">
            <div className="glass rounded-[22px] md:rounded-[30px] p-4 sm:p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-400">
                7
              </h3>

              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                Dining Tables
              </p>
            </div>

            <div className="glass rounded-[22px] md:rounded-[30px] p-4 sm:p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-400">
                5KM
              </h3>

              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                Free Delivery
              </p>
            </div>

            <div className="glass rounded-[22px] md:rounded-[30px] p-4 sm:p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-400">
                24+
              </h3>

              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                Premium Dishes
              </p>
            </div>

            <div className="glass rounded-[22px] md:rounded-[30px] p-4 sm:p-5 md:p-6 text-center shadow-premium">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-400">
                5%
              </h3>

              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest mt-3 text-gray-300">
                GST Billing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}