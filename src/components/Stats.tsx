export default function Stats() {
  return (
    <section className="bg-[#050505] border-y border-orange-500/10 py-14 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 text-center">

        <div className="bg-black border border-orange-500/20 rounded-[28px] p-6 md:p-8 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-orange-500 font-black">
            15+
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4 text-xs sm:text-sm">
            Years Experience
          </p>
        </div>

        <div className="bg-black border border-orange-500/20 rounded-[28px] p-6 md:p-8 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-orange-500 font-black">
            50+
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4 text-xs sm:text-sm">
            Authentic Recipes
          </p>
        </div>

        <div className="bg-black border border-orange-500/20 rounded-[28px] p-6 md:p-8 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-orange-500 font-black">
            10K+
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4 text-xs sm:text-sm">
            Happy Customers
          </p>
        </div>

        <div className="bg-black border border-orange-500/20 rounded-[28px] p-6 md:p-8 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-orange-500 font-black">
            100%
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4 text-xs sm:text-sm">
            Fresh Ingredients
          </p>
        </div>

      </div>
    </section>
  );
}