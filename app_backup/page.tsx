import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Music from "@/components/music/Music";
import Sets from "@/components/sets/Sets";
import About from "@/components/about/About";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Music />
      <Sets />
      <About />
      </main>
  );
}