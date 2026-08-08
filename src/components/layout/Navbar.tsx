"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold tracking-[0.3em] text-white">
          KENJI ZAN
        </h1>

        <ul className="hidden md:flex gap-8 text-white">
          <li className="hover:text-cyan-400 transition cursor-pointer">Inicio</li>
          <li className="hover:text-cyan-400 transition cursor-pointer">Música</li>
          <li className="hover:text-cyan-400 transition cursor-pointer">DJ Sets</li>
          <li className="hover:text-cyan-400 transition cursor-pointer">Galería</li>
          <li className="hover:text-cyan-400 transition cursor-pointer">Contacto</li>
        </ul>

        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-2 rounded-full transition">
          BOOK NOW
        </button>
      </nav>
    </header>
  );
}