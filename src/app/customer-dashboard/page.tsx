import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Specials from "../../components/Specials";
import Reservation from "../../components/Reservation";
import Gallery from "../../components/Gallery";
import Delivery from "../../components/Delivery";
import Contact from "../../components/Contact";
import Stats from "../../components/Stats";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <main className="bg-orange-500 overflow-x-hidden w-full min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative">
        <Hero />
      </section>

      {/* ABOUT */}
      <section className="relative">
        <About />
      </section>

      {/* MENU */}
      <section className="relative">
        <Specials />
      </section>

      {/* RESERVATION */}
      <section className="relative">
        <Reservation />
      </section>

      {/* GALLERY */}
      <section className="relative">
        <Gallery />
      </section>

      {/* DELIVERY */}
      <section className="relative">
        <Delivery />
      </section>

      {/* CONTACT */}
      <section className="relative">
        <Contact />
      </section>

      {/* STATS */}
      <section className="relative">
        <Stats />
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}