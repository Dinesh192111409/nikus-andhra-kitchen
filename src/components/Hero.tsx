export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-cover bg-center relative flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=2000')",
      }}
    >

      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32">

        <p className="text-5xl italic text-orange-300">
          Authentic
        </p>

        <h1 className="text-7xl md:text-8xl font-black text-white leading-tight mt-4">
          ANDHRA <br /> FLAVOURS
        </h1>

        <p className="text-2xl text-orange-200 mt-6 tracking-[0.3em]">
          SPICE. TRADITION. TASTE.
        </p>

        <p className="max-w-2xl text-white/90 text-xl mt-10 leading-9">
          Experience the rich and bold flavours of Andhra Pradesh,
          crafted with traditional recipes and premium ingredients.
        </p>

        <div className="flex gap-6 mt-12">

          <a
            href="#menu"
            className="bg-black text-white px-10 py-5 rounded-xl font-bold text-lg"
          >
            EXPLORE MENU
          </a>

          <a
            href="#reservation"
            className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg"
          >
            RESERVE TABLE
          </a>

        </div>

      </div>

    </section>
  );
}