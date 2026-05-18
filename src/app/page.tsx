import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Specials from "../components/Specials";
import About from "../components/About";
import Reservation from "../components/Reservation";
import Delivery from "../components/Delivery";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Specials />
      <About />
      <Reservation />
      <Delivery />
      <Gallery />
      <Footer />
    </main>
  );
}