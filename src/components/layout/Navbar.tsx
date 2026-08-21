"use client";

import { useState, type MouseEvent } from "react";

const links = [
  { name: "Inicio", href: "#home" },
  { name: "Música", href: "#music" },
  { name: "DJ Sets", href: "#sets" },
  { name: "About", href: "#about" },
  { name: "Galería", href: "#gallery" },
  { name: "Booking", href: "#booking" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) {
      console.warn(`Navigation target not found: ${href}`);
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);

    setMenuOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleNavigation(event, "#home")}
          className="text-xl font-black tracking-[0.3em] text-white"
        >
          KENJI ZAN
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                handleNavigation(event, link.href)
              }
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

        {/* Desktop Booking */}
        <a
          href="#booking"
          onClick={(event) =>
            handleNavigation(event, "#booking")
          }
          className="
            hidden
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
            md:block
          "
        >
          BOOK NOW
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            rounded-full
            border
            border-white/10
            px-4
            py-2
            text-sm
            font-bold
            text-white
            transition
            hover:border-cyan-400
            hover:text-cyan-400
            md:hidden
          "
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className="
            border-t
            border-white/10
            bg-black/95
            px-6
            py-6
            backdrop-blur-xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-5">

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) =>
                  handleNavigation(event, link.href)
                }
                className="
                  text-lg
                  font-bold
                  text-gray-300
                  transition
                  hover:text-cyan-400
                "
              >
                {link.name}
              </a>
            ))}

            <a
              href="#booking"
              onClick={(event) =>
                handleNavigation(event, "#booking")
              }
              className="
                mt-2
                rounded-full
                bg-cyan-400
                px-5
                py-3
                text-center
                font-black
                text-black
                transition
                hover:bg-cyan-300
              "
            >
              BOOK NOW
            </a>

          </div>
        </div>
      )}
    </header>
  );
}