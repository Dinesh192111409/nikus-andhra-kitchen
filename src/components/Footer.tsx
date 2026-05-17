export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-orange-500/20">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-14">

          {/* LOGO + ABOUT */}

          <div>

            <div className="flex items-center gap-4">

              <img
                src="/logo.png"
                alt="Nikus Andhra Kitchen"
                className="w-20 h-20 object-contain"
              />

              <div>

                <h2 className="text-3xl font-black">
                  NIKUS
                </h2>

                <p className="text-sm tracking-[0.3em] text-orange-400">
                  ANDHRA KITCHEN
                </p>

              </div>

            </div>

            <p className="text-gray-400 text-lg leading-8 mt-8">
              Authentic Andhra flavours with premium dining,
              spicy biryanis, seafood specials and unforgettable
              hospitality experience.
            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-2xl font-black text-orange-400 mb-8">
              Quick Links
            </h3>

            <div className="flex flex-col gap-5 text-lg">

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

            <h3 className="text-2xl font-black text-orange-400 mb-8">
              Contact
            </h3>

            <div className="space-y-6 text-lg text-gray-300">

              <p>
                📍 Bangalore, Karnataka,
                <br />
                India
              </p>

              <a
                href="tel:+919999999999"
                className="block hover:text-orange-400"
              >
                📞 +91 99999 99999
              </a>

              <a
                href="mailto:nikusandhrakitchen@gmail.com"
                className="block hover:text-orange-400"
              >
                ✉️ nikusandhrakitchen@gmail.com
              </a>

              <p>
                🕒 Open Daily
                <br />
                11:00 AM - 11:30 PM
              </p>

            </div>

          </div>

          {/* SOCIAL + DELIVERY */}

          <div>

            <h3 className="text-2xl font-black text-orange-400 mb-8">
              Follow Us
            </h3>

            <div className="flex flex-col gap-5">

              <a
                href="#"
                className="bg-white text-black px-6 py-4 rounded-2xl font-black hover:bg-orange-500 transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="bg-white text-black px-6 py-4 rounded-2xl font-black hover:bg-orange-500 transition"
              >
                Facebook
              </a>

              <a
                href="#"
                className="bg-white text-black px-6 py-4 rounded-2xl font-black hover:bg-orange-500 transition"
              >
                YouTube
              </a>

            </div>

            <div className="mt-10 bg-orange-500 text-black p-6 rounded-3xl">

              <h4 className="text-2xl font-black">
                Free Delivery
              </h4>

              <p className="mt-3 text-lg leading-8">
                Free delivery upto 5 KM.
                Extra delivery charges apply after 5 KM.
              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-white/10 mt-16 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-gray-400 text-lg text-center md:text-left">
            © 2026 Nikus Andhra Kitchen. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-gray-400 text-lg">

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