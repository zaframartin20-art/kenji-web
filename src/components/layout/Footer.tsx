"use client";

import {
  ArrowUpRight,
  Mail,
  Music2,
} from "lucide-react";

const navigation = [
  { name: "Inicio", href: "#home" },
  { name: "Música", href: "#music" },
  { name: "DJ Sets", href: "#sets" },
  { name: "About", href: "#about" },
  { name: "Galería", href: "#gallery" },
  { name: "Booking", href: "#booking" },
];

const socials = [
  {
    name: "Instagram",
    href: "#",
  },
  {
    name: "TikTok",
    href: "#",
  },
  {
    name: "YouTube",
    href: "#",
  },
  {
    name: "Spotify",
    href: "#",
  },
  {
    name: "SoundCloud",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">

      <div className="kz-container py-16">

        {/* Main footer */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">

          {/* Artist */}

          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-cyan-400">
              DJ / PRODUCER
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[0.15em] md:text-5xl">
              KENJI ZAN
            </h2>

            <p className="mt-5 max-w-md leading-7 text-gray-500">
              Electronic music, energy and emotion.
              Big Room House · Progressive House.
            </p>

            <a
              href="#booking"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-cyan-400
                px-6
                py-3
                text-sm
                font-black
                text-black
                transition
                hover:scale-105
                hover:bg-cyan-300
              "
            >
              BOOK KENJI ZAN
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* Navigation */}

          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-gray-500">
              NAVIGATION
            </p>

            <nav className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="
                    w-fit
                    text-sm
                    text-gray-400
                    transition
                    hover:translate-x-1
                    hover:text-cyan-400
                  "
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}

          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-gray-500">
              CONNECT
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">

              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noreferrer" : undefined}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-gray-400
                    transition
                    hover:border-cyan-400/30
                    hover:bg-cyan-400/5
                    hover:text-cyan-400
                  "
                >
                  {social.name}
                </a>
              ))}

            </div>

            <a
              href="mailto:booking@kenjizan.com"
              className="
                mt-4
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-3
                text-sm
                text-gray-400
                transition
                hover:border-cyan-400/30
                hover:text-cyan-400
              "
            >
              <Mail size={18} />
              Booking
            </a>

            <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
              <Music2 size={16} />
              <span>Electronic Music Artist</span>
            </div>
          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-gray-600 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Kenji Zan. All rights reserved.
          </p>

          <p>
            DJ · Producer · Mexico
          </p>

        </div>

      </div>
    </footer>
  );
}