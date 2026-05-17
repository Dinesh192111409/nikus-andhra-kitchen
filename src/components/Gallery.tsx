export default function Gallery() {

  const images = [

    "https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200",

    "https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1200",

    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200",

    "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200",

    "https://images.unsplash.com/photo-1625944525533-473f1cb7d3b2?q=80&w=1200",

    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200",

  ];

  return (

    <section
      id="gallery"
      className="bg-black py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[0.3em] text-orange-400 font-bold">
            Food Gallery
          </p>

          <h2 className="text-6xl font-black text-white mt-6">
            DELICIOUS
            <br />
            FOOD MOMENTS
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {images.map((image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-[30px] shadow-2xl group"
            >

              <img
                src={image}
                alt="Food"
                className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}