export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#d9480f] text-white py-20 px-8"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-14">

        <div>

          <img
            src="/logo.png"
            className="w-32"
          />

          <p className="mt-6 leading-8 text-white/90">
            Nikus Andhra Kitchen brings you authentic Andhra flavours,
            biryanis, curries and premium dining experience.
          </p>

        </div>

        <div>

          <h2 className="text-2xl font-black mb-6">
            QUICK LINKS
          </h2>

          <div className="flex flex-col gap-4">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#reservation">Reservations</a>
          </div>

        </div>

        <div>

          <h2 className="text-2xl font-black mb-6">
            OUR MENU
          </h2>

          <div className="flex flex-col gap-4">
            <p>Biryani</p>
            <p>Starters</p>
            <p>Curries</p>
            <p>Seafood</p>
            <p>Desserts</p>
          </div>

        </div>

        <div>

          <h2 className="text-2xl font-black mb-6">
            CONTACT US
          </h2>

          <div className="flex flex-col gap-5 text-white/90">

            <p>
              📍 Bengaluru, Karnataka
            </p>

            <p>
              📞 +91 9876543210
            </p>

            <p>
              ✉ info@nikusandhrakitchen.com
            </p>

            <p>
              🕒 Mon - Sun : 11 AM - 11 PM
            </p>

          </div>

        </div>

      </div>

      <div className="border-t border-white/20 mt-16 pt-10 text-center">
        © 2026 Nikus Andhra Kitchen. All Rights Reserved.
      </div>

    </footer>
  );
}