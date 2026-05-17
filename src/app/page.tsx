import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Specials from "../components/Specials";
import Reservation from "../components/Reservation";
import Gallery from "../components/Gallery";
import Delivery from "../components/Delivery";
import Contact from "../components/Contact";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-orange-500 overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* ABOUT SECTION */}
      <About />

      {/* MENU / ORDER SECTION */}
      <Specials />

      {/* TABLE BOOKING */}
      <Reservation />

      {/* FOOD GALLERY */}
      <Gallery />

      {/* DELIVERY SECTION */}
      <Delivery />

      {/* CONTACT SECTION */}
      <Contact />

      {/* STATS SECTION */}
      <Stats />

      {/* FOOTER */}
      <Footer />

    </main>
  );
}