"use client";

import { useState } from "react";

const navLinks = [
  { name: "MENU", href: "#menu" },
  { name: "OFFERS", href: "#menu" },
  { name: "BOOK TABLE", href: "#reservation" },
  { name: "TRACK ORDER", href: "#delivery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-[#1a1a1a] to-[#e85d04] shadow-2xl border-b border-orange-500/20 backdrop-blur-xl overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-6 md:px-8 py-3">
        <a href="#home" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src="/logo.png"
            alt="Nikus Andhra Kitchen"
            className="w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain shrink-0"
          />

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-3xl font-black text-white leading-none truncate">
              NIKUS
            </h1>

            <p className="text-[8px] sm:text-[9px] md:text-xs tracking-[0.18em] sm:tracking-[0.25em] text-orange-400 font-black uppercase truncate">
              Andhra Kitchen
            </p>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 font-black text-sm tracking-widest uppercase text-white">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-orange-400 transition duration-300 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <a
            href="#menu"
            className="bg-orange-500 hover:bg-orange-400 text-black px-4 xl:px-6 py-3 rounded-full font-black transition duration-300 hover:scale-105 whitespace-nowrap"
          >
            ORDER NOW
          </a>

          <a
            href="#menu"
            className="bg-white hover:bg-gray-200 text-black px-4 xl:px-5 py-3 rounded-full font-black transition duration-300 hover:scale-105 whitespace-nowrap"
          >
            CART
          </a>

          <a
            href="/owner-login"
            className="bg-black border border-orange-400 text-white px-4 xl:px-5 py-3 rounded-full font-black hover:bg-orange-500 hover:text-black transition duration-300 hover:scale-105 whitespace-nowrap"
          >
            OWNER
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden text-white text-3xl sm:text-4xl font-black shrink-0 leading-none"
          aria-label="Toggle menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="xl:hidden w-full bg-gradient-to-b from-black to-[#e85d04] px-4 sm:px-6 py-5 border-t border-orange-500/20 shadow-2xl">
          <nav className="flex flex-col gap-4 text-white text-base sm:text-lg font-black uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-orange-300 transition break-words"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#menu"
              onClick={() => setOpen(false)}
              className="bg-orange-500 text-black px-5 py-4 rounded-full text-center font-black w-full"
            >
              ORDER NOW
            </a>

            <a
              href="#menu"
              onClick={() => setOpen(false)}
              className="bg-white text-black px-5 py-4 rounded-full text-center font-black w-full"
            >
              CART
            </a>

            <a
              href="/owner-login"
              onClick={() => setOpen(false)}
              className="bg-black border border-orange-400 text-white px-5 py-4 rounded-full text-center font-black w-full"
            >
              OWNER LOGIN
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}