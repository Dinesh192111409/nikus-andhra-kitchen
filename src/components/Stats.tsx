export default function Stats() {
  return (
    <section className="bg-[#050505] border-y border-orange-500/10 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

        <div>
          <h2 className="text-6xl text-orange-500 font-bold">
            15+
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4">
            Years Experience
          </p>
        </div>

        <div>
          <h2 className="text-6xl text-orange-500 font-bold">
            50+
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4">
            Authentic Recipes
          </p>
        </div>

        <div>
          <h2 className="text-6xl text-orange-500 font-bold">
            10K+
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4">
            Happy Customers
          </p>
        </div>

        <div>
          <h2 className="text-6xl text-orange-500 font-bold">
            100%
          </h2>

          <p className="text-gray-400 uppercase tracking-widest mt-4">
            Fresh Ingredients
          </p>
        </div>

      </div>
    </section>
  );
}