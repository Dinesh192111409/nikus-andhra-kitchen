const galleryImages = [
  {
    title: "Hyderabadi Dum Biryani",
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1200",
  },

  {
    title: "Spicy Chicken Curry",
    category: "Curries",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200",
  },

  {
    title: "Chicken Starters",
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200",
  },

  {
    title: "Mutton Special",
    category: "Mutton",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1200",
  },

  {
    title: "Prawns Special",
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200",
  },

  {
    title: "Paneer Butter Masala",
    category: "Veg",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200",
  },

  {
    title: "Veg Curry",
    category: "Veg",
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1200",
  },

  {
    title: "Fried Rice",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200",
  },

  {
    title: "Noodles",
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200",
  },

  {
    title: "Soup",
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200",
  },

  {
    title: "Desserts",
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14 md:mb-20">

          <p className="text-orange-400 uppercase tracking-[0.25em] sm:tracking-[0.4em] font-black text-xs sm:text-sm">
            Food Gallery
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mt-6 leading-tight">
            PREMIUM FOOD
            <br />
            MOMENTS
          </h2>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-8">
            A visual taste of Nikus Andhra Kitchen — biryanis,
            curries, starters, seafood, desserts and more.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">

          {galleryImages.map((item, index) => (

            <div
              key={index}
              className={`relative group overflow-hidden rounded-[24px] md:rounded-[32px] shadow-2xl
              
              ${
                index === 0 || index === 5
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }`}
            >

              <img
                src={item.image}
                alt={item.title}
                className={`w-full object-cover group-hover:scale-110 transition duration-700
                  
                  ${
                    index === 0 || index === 5
                      ? "h-[320px] sm:h-[420px] lg:h-[520px]"
                      : "h-[240px] sm:h-[250px]"
                  }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>

              <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-orange-500 text-black px-3 md:px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">

                {item.category}

              </div>

              <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6">

                <h3 className="text-white text-xl sm:text-2xl font-black leading-tight">
                  {item.title}
                </h3>

                <p className="text-gray-300 mt-2 text-sm sm:text-base leading-6">
                  Authentic Andhra flavour, served fresh.
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="mt-12 md:mt-16 text-center">

          <a
            href="#menu"
            className="inline-block bg-orange-500 text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg hover:scale-105 transition"
          >
            Explore Full Menu
          </a>

        </div>

      </div>
    </section>
  );
}