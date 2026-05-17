export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#111111] text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[0.4em] text-orange-400 text-sm font-black">
            Contact Us
          </p>

          <h2 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
            VISIT
            <br />
            NIKUS ANDHRA KITCHEN
          </h2>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl mx-auto leading-9">
            Experience authentic Andhra flavours, premium dining,
            spicy biryanis and unforgettable hospitality.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-14">

          {/* LEFT SIDE */}

          <div className="bg-black rounded-[40px] p-10 border border-orange-500/20 shadow-2xl">

            <h3 className="text-4xl font-black mb-10 text-orange-400">
              Restaurant Details
            </h3>

            <div className="space-y-10">

              {/* ADDRESS */}

              <div className="flex gap-5 items-start">

                <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
                  📍
                </div>

                <div>

                  <h4 className="text-2xl font-black">
                    Address
                  </h4>

                  <p className="text-gray-300 text-lg mt-2 leading-8">
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

              {/* PHONE */}

              <div className="flex gap-5 items-start">

                <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
                  📞
                </div>

                <div>

                  <h4 className="text-2xl font-black">
                    Phone Number
                  </h4>

                  <a
                    href="tel:+919999999999"
                    className="text-gray-300 text-lg mt-2 block hover:text-orange-400"
                  >
                    +91 99999 99999
                  </a>

                </div>

              </div>

              {/* EMAIL */}

              <div className="flex gap-5 items-start">

                <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
                  ✉️
                </div>

                <div>

                  <h4 className="text-2xl font-black">
                    Email Address
                  </h4>

                  <a
                    href="mailto:nikusandhrakitchen@gmail.com"
                    className="text-gray-300 text-lg mt-2 block hover:text-orange-400"
                  >
                    nikusandhrakitchen@gmail.com
                  </a>

                </div>

              </div>

              {/* TIMINGS */}

              <div className="flex gap-5 items-start">

                <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl">
                  🕒
                </div>

                <div>

                  <h4 className="text-2xl font-black">
                    Opening Hours
                  </h4>

                  <p className="text-gray-300 text-lg mt-2 leading-8">
                    Monday - Sunday
                    <br />
                    11:00 AM - 11:30 PM
                  </p>

                </div>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-5 mt-14">

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                className="bg-green-500 text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition"
              >
                WhatsApp
              </a>

              <a
                href="tel:+919999999999"
                className="bg-orange-500 text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition"
              >
                Call Now
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Nikus%20Andhra%20Kitchen%20Sarjapura%20Road%20Bengaluru"
                target="_blank"
                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition"
              >
                View Location
              </a>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-black rounded-[40px] overflow-hidden border border-orange-500/20 shadow-2xl">

            <iframe
              src="https://www.google.com/maps?q=Nikus%20Andhra%20Kitchen%20Sarjapura%20Road%20Bengaluru&output=embed"
              className="w-full h-full min-h-[650px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

        {/* SOCIALS */}

        <div className="mt-24 text-center">

          <h3 className="text-3xl font-black text-orange-400">
            Follow Us
          </h3>

          <div className="flex justify-center gap-6 mt-8 flex-wrap">

            <a
              href="#"
              className="bg-white text-black px-8 py-4 rounded-full font-black hover:bg-orange-500 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="bg-white text-black px-8 py-4 rounded-full font-black hover:bg-orange-500 transition"
            >
              Facebook
            </a>

            <a
              href="#"
              className="bg-white text-black px-8 py-4 rounded-full font-black hover:bg-orange-500 transition"
            >
              YouTube
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}