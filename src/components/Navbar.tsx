export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#e85d04]/95 backdrop-blur-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <div className="flex items-center gap-4">

          <img
            src="/logo.png"
            className="w-20 h-20 object-contain"
          />

          <div>
            <h1 className="text-3xl font-black text-white leading-none">
              NIKUS
            </h1>

            <p className="text-sm tracking-[0.3em] text-white">
              ANDHRA KITCHEN
            </p>
          </div>

        </div>

        <nav className="hidden md:flex gap-10 text-white font-bold text-lg">

          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#menu">MENU</a>
          <a href="#gallery">GALLERY</a>
          <a href="#reservation">RESERVATIONS</a>
          <a href="#contact">CONTACT</a>

        </nav>

        <a
          href="#reservation"
          className="bg-black text-white px-7 py-4 rounded-xl font-bold"
        >
          BOOK A TABLE
        </a>

      </div>

    </header>
  );
}