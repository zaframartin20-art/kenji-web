"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const gallery = [
  {
    image: "/images/gallery-01.jpg",
    title: "LIVE",
    description: "Live performance",
  },
  {
    image: "/images/gallery-02.jpg",
    title: "STUDIO",
    description: "Music production",
  },
  {
    image: "/images/gallery-03.jpg",
    title: "ENERGY",
    description: "Festival energy",
  },
  {
    image: "/images/gallery-04.jpg",
    title: "BEHIND THE MUSIC",
    description: "Behind the scenes",
  },
  {
    image: "/images/gallery-05.jpg",
    title: "DJ LIFE",
    description: "The DJ journey",
  },
  {
    image: "/images/gallery-06.jpg",
    title: "KENJI ZAN",
    description: "DJ & Producer",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="kz-section py-32">
      <div className="kz-container">

        <SectionTitle
          title="GALLERY"
          subtitle="Moments behind the music"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {gallery.map((item, index) => (
            <motion.article
              key={item.image}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                kz-glass
                kz-glow
                group
                relative
                h-[360px]
                overflow-hidden
                rounded-3xl
              "
            >

              {/* Image */}

              <img
                src={item.image}
                alt={`${item.title} — Kenji Zan`}
                loading="lazy"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* Gradient */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/20
                  to-transparent
                  opacity-90
                "
              />

              {/* Cyan hover glow */}

              <div
                className="
                  absolute
                  inset-0
                  bg-cyan-400/0
                  transition
                  duration-500
                  group-hover:bg-cyan-400/5
                "
              />

              {/* Content */}

              <div className="absolute inset-x-0 bottom-0 p-7">

                <p className="
                  text-xs
                  font-bold
                  tracking-[0.35em]
                  text-cyan-400
                ">
                  KENJI ZAN
                </p>

                <h3 className="
                  mt-2
                  text-2xl
                  font-black
                  text-white
                  md:text-3xl
                ">
                  {item.title}
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-gray-400
                  transition
                  duration-300
                  group-hover:text-gray-300
                ">
                  {item.description}
                </p>

                <div className="
                  mt-5
                  h-px
                  w-0
                  bg-cyan-400
                  transition-all
                  duration-500
                  group-hover:w-20
                " />

              </div>

            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
}