"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const gallery = [
  {
    image: "/images/gallery-01.jpg",
    title: "LIVE",
  },
  {
    image: "/images/gallery-02.jpg",
    title: "STUDIO",
  },
  {
    image: "/images/gallery-03.jpg",
    title: "ENERGY",
  },
  {
    image: "/images/gallery-04.jpg",
    title: "BEHIND THE MUSIC",
  },
  {
    image: "/images/gallery-05.jpg",
    title: "DJ LIFE",
  },
  {
    image: "/images/gallery-06.jpg",
    title: "KENJI ZAN",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-neutral-950 px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <SectionTitle
          title="GALLERY"
          subtitle="Moments behind the music"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {gallery.map((item, index) => (
            <motion.div
              key={item.image}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                relative
                h-80
                overflow-hidden
                rounded-3xl
                border
                border-white/10
              "
            >

              <img
                src={item.image}
                alt={item.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/10
                  to-transparent
                "
              />

              <div className="absolute bottom-6 left-6">

                <p className="text-sm font-semibold tracking-[0.3em] text-cyan-400">
                  KENJI ZAN
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  {item.title}
                </h3>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}