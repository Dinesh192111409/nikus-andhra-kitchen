export default function About() {
  return (
    <section
      id="about"
      className="bg-[#e85d04] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <div className="inline-flex bg-black/20 border border-white/20 rounded-full px-4 sm:px-6 py-3">
            <p className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-white text-xs sm:text-sm font-black">
              Our Story
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mt-8 leading-tight">
            A Legacy of
            <br />
            Andhra Cuisine
          </h2>

          <p className="text-white/90 text-base sm:text-lg md:text-xl leading-8 md:leading-9 mt-8 md:mt-10 max-w-2xl">
            At Nikus Andhra Kitchen, every dish is crafted with bold Andhra
            spices, slow-cooked flavours, traditional recipes, and the warmth of
            home-style dining.
          </p>

          <p className="text-white/80 text-base sm:text-lg md:text-xl leading-8 md:leading-9 mt-5 md:mt-6 max-w-2xl">
            From hot biryanis to spicy starters and rich curries, our kitchen
            brings an authentic Andhra dining experience to Bengaluru.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mt-10 md:mt-12 max-w-xl">
            <div className="bg-white text-black rounded-[24px] md:rounded-[28px] p-5 md:p-6 shadow-premium">
              <h3 className="text-3xl md:text-4xl font-black">100%</h3>
              <p className="font-bold mt-2">Authentic Spices</p>
            </div>

            <div className="bg-black text-white rounded-[24px] md:rounded-[28px] p-5 md:p-6 shadow-premium">
              <h3 className="text-3xl md:text-4xl font-black text-orange-400">
                7
              </h3>
              <p className="font-bold mt-2">Dining Tables</p>
            </div>
          </div>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a
              href="#menu"
              className="bg-black text-white px-8 py-4 rounded-2xl font-black hover:scale-105 text-center"
            >
              View Menu
            </a>

            <a
              href="#reservation"
              className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:scale-105 text-center"
            >
              Book Table
            </a>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <div className="absolute -top-6 -left-6 w-28 sm:w-40 h-28 sm:h-40 bg-black/20 rounded-full blur-2xl"></div>

          <img
            src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1400"
            alt="Authentic Andhra cuisine"
            className="relative z-10 rounded-[30px] md:rounded-[45px] shadow-2xl w-full h-[320px] sm:h-[450px] lg:h-[620px] object-cover"
          />

          <div className="relative lg:absolute lg:-bottom-8 lg:-right-8 bg-black text-white rounded-[28px] md:rounded-[35px] p-6 md:p-8 shadow-2xl z-20 max-w-sm mt-6 lg:mt-0">
            <p className="text-orange-400 uppercase tracking-[0.18em] md:tracking-[0.25em] text-xs font-black">
              Signature Taste
            </p>

            <h3 className="text-2xl md:text-3xl font-black mt-3">
              Spice. Tradition. Taste.
            </h3>

            <p className="text-gray-300 mt-4 leading-7">
              Premium Andhra flavours made fresh every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}