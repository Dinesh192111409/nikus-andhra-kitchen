export default function About() {
  return (
    <section
      id="about"
      className="bg-[#e85d04] py-24 px-8"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        <div>

          <p className="uppercase tracking-[0.3em] text-orange-200">
            OUR STORY
          </p>

          <h1 className="text-6xl font-black text-white mt-6 leading-tight">
            A Legacy of Andhra Cuisine
          </h1>

          <p className="text-white/90 text-xl leading-10 mt-10">
            At Nikus Andhra Kitchen, we bring the heart of Andhra
            to your plate with bold spices, traditional recipes,
            authentic biryanis and unforgettable flavours.
          </p>

          <div className="mt-10">

            <p className="text-5xl italic text-orange-200">
              Nikus
            </p>

            <p className="text-white font-bold mt-3">
              FOUNDER & CHEF
            </p>

          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1400"
          className="rounded-[40px] shadow-2xl"
        />

      </div>

    </section>
  );
}