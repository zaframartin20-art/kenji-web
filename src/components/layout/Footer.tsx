"use client";

import { Mail, Music2 } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    href: "#",
    label: "IG",
  },
  {
    name: "YouTube",
    href: "#",
    label: "YT",
  },
  {
    name: "TikTok",
    href: "#",
    label: "TK",
  },
  {
    name: "Email",
    href: "mailto:booking@kenjizan.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-sm font-semibold tracking-[0.4em] text-cyan-400">
              DJ / PRODUCER
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[0.15em]">
              KENJI ZAN
            </h2>

            <p className="mt-4 text-gray-500">
              Big Room House · Progressive House
            </p>
          </div>

          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-sm
                    font-black
                    transition
                    hover:-translate-y-1
                    hover:border-cyan-400/50
                    hover:bg-cyan-400
                    hover:text-black
                  "
                >
                  {Icon ? <Icon size={20} /> : social.label}
                </a>
              );
            })}
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Kenji Zan. All rights reserved.
        </div>

      </div>
    </footer>
  );
}