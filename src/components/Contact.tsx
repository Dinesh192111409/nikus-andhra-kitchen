export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#111111] text-white py-16 sm:py-20 md:py-28 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14 md:mb-20">

          <p className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-orange-400 text-xs sm:text-sm font-black">
            Contact Us
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mt-6 leading-tight">
            VISIT
            <br />
            NIKUS ANDHRA KITCHEN
          </h2>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-8 md:leading-9">
            Experience authentic Andhra flavours, premium dining,
            spicy biryanis and unforgettable hospitality.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">

          <div className="bg-black rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 border border-orange-500/20 shadow-2xl">

            <h3 className="text-3xl md:text-4xl font-black mb-8 md:mb-10 text-orange-400">
              Restaurant Details
            </h3>

            <div className="space-y-8 md:space-y-10">

              <div className="flex gap-4 md:gap-5 items-start">

                <div className="bg-orange-500 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0">
                  📍
                </div>

                <div>
                  <h4 className="text-xl md:text-2xl font-black">
                    Address
                  </h4>

                  <p className="text-gray-300 text-base md:text-lg mt-2 leading-7 md:leading-8">
                    Nikus Andhra Kitchen,
                    <br />
                    Sarjapura Road,
                    <br />
                    Bengaluru, Karnataka,
                    <br />
                    India
                  </p>
                </div>

              </div>

              <div className="flex gap-4 md:gap-5 items-start">

                <div className="bg-orange-500 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0">
                  📞
                </div>

                <div>
                  <h4 className="text-xl md:text-2xl font-black">
                    Phone Number
                  </h4>

                  <a
                    href="tel:+919999999999"
                    className="text-gray-300 text-base md:text-lg mt-2 block hover:text-orange-400 break-all"
                  >
                    +91 99999 99999
                  </a>
                </div>

              </div>

              <div className="flex gap-4 md:gap-5 items-start">

                <div className="bg-orange-500 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0">
                  ✉️
                </div>

                <div>
                  <h4 className="text-xl md:text-2xl font-black">
                    Email Address
                  </h4>

                  <a
                    href="mailto:nikusandhrakitchen@gmail.com"
                    className="text-gray-300 text-base md:text-lg mt-2 block hover:text-orange-400 break-all"
                  >
                    nikusandhrakitchen@gmail.com
                  </a>
                </div>

              </div>

              <div className="flex gap-4 md:gap-5 items-start">

                <div className="bg-orange-500 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0">
                  🕒
                </div>

                <div>
                  <h4 className="text-xl md:text-2xl font-black">
                    Opening Hours
                  </h4>

                  <p className="text-gray-300 text-base md:text-lg mt-2 leading-7 md:leading-8">
                    Monday - Sunday
                    <br />
                    11:00 AM - 11:30 PM
                  </p>
                </div>

              </div>

            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-5 mt-12 md:mt-14">

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="bg-green-500 text-black px-6 md:px-8 py-4 rounded-2xl font-black text-base md:text-lg hover:scale-105 transition text-center"
              >
                WhatsApp
              </a>

              <a
                href="tel:+919999999999"
                className="bg-orange-500 text-black px-6 md:px-8 py-4 rounded-2xl font-black text-base md:text-lg hover:scale-105 transition text-center"
              >
                Call Now
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Nikus%20Andhra%20Kitchen%20Sarjapura%20Road%20Bengaluru"
                target="_blank"
                className="bg-white text-black px-6 md:px-8 py-4 rounded-2xl font-black text-base md:text-lg hover:scale-105 transition text-center"
              >
                View Location
              </a>

            </div>

          </div>

          <div className="bg-black rounded-[30px] md:rounded-[40px] overflow-hidden border border-orange-500/20 shadow-2xl">

            <iframe
              src="https://www.google.com/maps?q=Nikus%20Andhra%20Kitchen%20Sarjapura%20Road%20Bengaluru&output=embed"
              className="w-full h-[350px] sm:h-[450px] md:h-[650px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

        <div className="mt-16 md:mt-24 text-center">

          <h3 className="text-2xl md:text-3xl font-black text-orange-400">
            Follow Us
          </h3>

          <div className="flex justify-center gap-4 md:gap-6 mt-8 flex-wrap">

            <a
              href="#"
              className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-black hover:bg-orange-500 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-black hover:bg-orange-500 transition"
            >
              Facebook
            </a>

            <a
              href="#"
              className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-black hover:bg-orange-500 transition"
            >
              YouTube
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}