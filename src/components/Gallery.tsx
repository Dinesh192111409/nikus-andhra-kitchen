import Image from "next/image";

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
      className="bg-black py-16 sm:py-20 md:py-28 px-3 sm:px-6 overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-orange-400 uppercase tracking-[0.18em] sm:tracking-[0.4em] font-black text-[10px] sm:text-sm">
            Food Gallery
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mt-6 leading-tight break-words">
            PREMIUM FOOD
            <br />
            MOMENTS
          </h2>

          <p className="text-gray-400 text-sm sm:text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-7 md:leading-8">
            A visual taste of Nikus Andhra Kitchen — biryanis, curries,
            starters, seafood, desserts and more.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] shadow-2xl break-inside-avoid group border border-orange-500/20 bg-[#111111]"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`w-full object-cover group-hover:scale-105 transition duration-700 ${
                  index % 3 === 0
                    ? "h-[300px] sm:h-[420px]"
                    : index % 3 === 1
                      ? "h-[240px] sm:h-[320px]"
                      : "h-[270px] sm:h-[360px]"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-orange-500 text-black px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">
                {item.category}
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-white text-xl sm:text-2xl font-black leading-tight break-words">
                  {item.title}
                </h3>

                <p className="text-gray-300 mt-2 text-xs sm:text-sm leading-6">
                  Authentic Andhra flavour served fresh.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <a
            href="#menu"
            className="inline-block bg-orange-500 text-black px-6 sm:px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-sm md:text-lg hover:scale-105 transition w-full sm:w-auto"
          >
            Explore Full Menu
          </a>
        </div>
      </div>
    </section>
  );
}
