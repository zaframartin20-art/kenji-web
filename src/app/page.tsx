import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Music from "@/components/music/Music";
import About from "@/components/about/About";
import Sets from "@/components/sets/Sets";
import Gallery from "@/components/gallery/Gallery";
import Booking from "@/components/booking/Booking";
import Footer from "@/components/layout/Footer";
import Experience from "@/components/experience/Experience";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />

      <Hero />

      <Music />

      <Sets />

      <About />

      <Experience />

      <Gallery />

      <Booking />

      <Footer />
    </main>
  );
}