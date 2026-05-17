"use client";

import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "MENU", href: "#menu" },
  { name: "GALLERY", href: "#gallery" },
  { name: "RESERVATIONS", href: "#reservation" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#e85d04]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4">
        <a href="#home" className="flex items-center gap-3 md:gap-4">
          <img
            src="/logo.png"
            alt="Nikus Andhra Kitchen"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain"
          />

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none">
              NIKUS
            </h1>

            <p className="text-[8px] sm:text-[10px] md:text-sm tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-white uppercase">
              Andhra Kitchen
            </p>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-8 text-white font-bold text-sm tracking-[0.15em] uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-black transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#reservation"
          className="hidden lg:flex bg-black text-white px-6 py-3 md:px-7 md:py-4 rounded-2xl font-black hover:bg-white hover:text-black transition duration-300 hover:scale-105"
        >
          BOOK A TABLE
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden text-white text-3xl sm:text-4xl font-black"
          aria-label="Toggle menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-black/95 backdrop-blur-xl px-5 sm:px-6 py-6 sm:py-8 border-t border-white/10">
          <nav className="flex flex-col gap-5 sm:gap-6 text-white text-lg sm:text-xl font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-orange-400 transition"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="bg-orange-500 text-black px-6 py-4 rounded-2xl text-center font-black mt-4"
            >
              BOOK A TABLE
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}