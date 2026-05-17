export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-orange-500/20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 md:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-14">

          {/* LOGO + ABOUT */}

          <div>

            <div className="flex items-center gap-4">

              <img
                src="/logo.png"
                alt="Nikus Andhra Kitchen"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />

              <div>

                <h2 className="text-2xl sm:text-3xl font-black">
                  NIKUS
                </h2>

                <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-orange-400">
                  ANDHRA KITCHEN
                </p>

              </div>

            </div>

            <p className="text-gray-400 text-base sm:text-lg leading-7 sm:leading-8 mt-6 sm:mt-8">
              Authentic Andhra flavours with premium dining,
              spicy biryanis, seafood specials and unforgettable
              hospitality experience.
            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-xl sm:text-2xl font-black text-orange-400 mb-6 sm:mb-8">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 sm:gap-5 text-base sm:text-lg">

              <a
                href="#home"
                className="hover:text-orange-400 transition"
              >
                Home
              </a>

              <a
                href="#about"
                className="hover:text-orange-400 transition"
              >
                About
              </a>

              <a
                href="#menu"
                className="hover:text-orange-400 transition"
              >
                Menu
              </a>

              <a
                href="#gallery"
                className="hover:text-orange-400 transition"
              >
                Gallery
              </a>

              <a
                href="#reservation"
                className="hover:text-orange-400 transition"
              >
                Reservation
              </a>

              <a
                href="#contact"
                className="hover:text-orange-400 transition"
              >
                Contact
              </a>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="text-xl sm:text-2xl font-black text-orange-400 mb-6 sm:mb-8">
              Contact
            </h3>

            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-gray-300">

              <p className="leading-7">
                📍 Bangalore, Karnataka,
                <br />
                India
              </p>

              <a
                href="tel:+919999999999"
                className="block hover:text-orange-400 break-all"
              >
                📞 +91 99999 99999
              </a>

              <a
                href="mailto:nikusandhrakitchen@gmail.com"
                className="block hover:text-orange-400 break-all"
              >
                ✉️ nikusandhrakitchen@gmail.com
              </a>

              <p className="leading-7">
                🕒 Open Daily
                <br />
                11:00 AM - 11:30 PM
              </p>

            </div>

          </div>

          {/* SOCIAL + DELIVERY */}

          <div>

            <h3 className="text-xl sm:text-2xl font-black text-orange-400 mb-6 sm:mb-8">
              Follow Us
            </h3>

            <div className="flex flex-col gap-4 sm:gap-5">

              <a
                href="#"
                className="bg-white text-black px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-black text-center hover:bg-orange-500 transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="bg-white text-black px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-black text-center hover:bg-orange-500 transition"
              >
                Facebook
              </a>

              <a
                href="#"
                className="bg-white text-black px-5 sm:px-6 py-3 sm:py-4 rounded-2xl font-black text-center hover:bg-orange-500 transition"
              >
                YouTube
              </a>

            </div>

            <div className="mt-8 sm:mt-10 bg-orange-500 text-black p-5 sm:p-6 rounded-3xl">

              <h4 className="text-xl sm:text-2xl font-black">
                Free Delivery
              </h4>

              <p className="mt-3 text-base sm:text-lg leading-7 sm:leading-8">
                Free delivery upto 5 KM.
                Extra delivery charges apply after 5 KM.
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-8 sm:pt-10 flex flex-col lg:flex-row items-center justify-between gap-6">

          <p className="text-gray-400 text-sm sm:text-lg text-center lg:text-left">
            © 2026 Nikus Andhra Kitchen. All Rights Reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-lg">

            <a href="#" className="hover:text-orange-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-400">
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}