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

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4">

        {/* LOGO */}

        <a
          href="#home"
          className="flex items-center gap-4"
        >

          <img
            src="/logo.png"
            alt="Nikus Andhra Kitchen"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />

          <div>

            <h1 className="text-2xl md:text-3xl font-black text-white leading-none">

              NIKUS

            </h1>

            <p className="text-[10px] md:text-sm tracking-[0.35em] text-white uppercase">

              Andhra Kitchen

            </p>

          </div>

        </a>

        {/* DESKTOP MENU */}

        <nav className="hidden lg:flex items-center gap-10 text-white font-bold text-sm tracking-[0.15em] uppercase">

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

        {/* BOOK BUTTON */}

        <a
          href="#reservation"
          className="hidden md:flex bg-black text-white px-7 py-4 rounded-2xl font-black hover:bg-white hover:text-black transition duration-300 hover:scale-105"
        >

          BOOK A TABLE

        </a>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-4xl font-black"
        >

          {open ? "×" : "☰"}

        </button>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="lg:hidden bg-black/95 backdrop-blur-xl px-6 py-8 border-t border-white/10">

          <nav className="flex flex-col gap-6 text-white text-xl font-bold uppercase tracking-widest">

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