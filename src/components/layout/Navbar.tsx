"use client";

const links = [
  { name: "Inicio", href: "#home" },
  { name: "Música", href: "#music" },
  { name: "DJ Sets", href: "#sets" },
  { name: "About", href: "#about" },
  { name: "Galería", href: "#gallery" },
  { name: "Booking", href: "#booking" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <a
          href="#home"
          className="text-xl font-black tracking-[0.3em] text-white"
        >
          KENJI ZAN
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-sm
                font-medium
                text-gray-300
                transition
                hover:text-cyan-400
              "
            >
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="#booking"
          onClick={(e) => {
          e.preventDefault();

          document.getElementById("booking")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          });
          }}
          className="
            rounded-full
            bg-cyan-400
            px-5
            py-2.5
            text-sm
            font-black
            text-black
            transition
            hover:scale-105
            hover:bg-cyan-300
          "
        >
          BOOK NOW
        </a>

      </nav>
    </header>
  );
}