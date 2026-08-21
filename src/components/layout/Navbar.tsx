"use client";

import { useEffect, useState, type MouseEvent } from "react";

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
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  /*
   * Detect scroll position
   */
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);

      const sections = links
        .map((link) => document.querySelector(link.href))
        .filter(Boolean);

      let currentSection = "home";

      for (const section of sections) {
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 140) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Close mobile menu with Escape
   */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

    setActiveSection(href.replace("#", ""));
    setMenuOpen(false);
  }

  return (
    <header
      className={`
        fixed
        left-0
        top-0
        z-50
        w-full
        border-b
        transition-all
        duration-300
        ${
          scrolled
            ? "border-white/10 bg-black/85 shadow-lg shadow-cyan-400/5 backdrop-blur-xl"
            : "border-white/10 bg-black/30 backdrop-blur-xl"
        }
      `}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">

        {/* Logo */}
        <a
          href="#home"
          onClick={(event) =>
            handleNavigation(event, "#home")
          }
          aria-label="Kenji Zan - Home"
          className="
            text-lg
            font-black
            tracking-[0.3em]
            text-white
            transition
            hover:text-cyan-400
            md:text-xl
          "
        >
          KENJI ZAN
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const isActive =
              activeSection === link.href.replace("#", "");

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) =>
                  handleNavigation(event, link.href)
                }
                className={`
                  relative
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }
                `}
              >
                {link.name}

                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      left-0
                      h-[2px]
                      w-full
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_10px_rgba(34,211,238,0.8)]
                    "
                  />
                )}
              </a>
            );
          })}
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
            shadow-[0_0_20px_rgba(34,211,238,0.15)]
            transition
            hover:scale-105
            hover:bg-cyan-300
            hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]
            md:block
          "
        >
          BOOK NOW
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
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
            shadow-2xl
            backdrop-blur-xl
            md:hidden
          "
        >
          <div className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive =
                activeSection === link.href.replace("#", "");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) =>
                    handleNavigation(event, link.href)
                  }
                  className={`
                    rounded-lg
                    px-3
                    py-2
                    text-lg
                    font-bold
                    transition
                    ${
                      isActive
                        ? "bg-cyan-400/10 text-cyan-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-cyan-400"
                    }
                  `}
                >
                  {link.name}
                </a>
              );
            })}

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