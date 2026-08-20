"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const genres = [
  "BIG ROOM HOUSE",
  "PROGRESSIVE HOUSE",
  "EMOTIONAL PROGRESSIVE",
  "TECH HOUSE",
];

const highlights = [
  {
    number: "01",
    title: "DJ",
    description:
      "Sets construidos para generar energía, emoción y conexión con el público.",
  },
  {
    number: "02",
    title: "PRODUCER",
    description:
      "Producción de música electrónica con una identidad enfocada en melodía, energía y evolución.",
  },
  {
    number: "03",
    title: "LIVE EXPERIENCE",
    description:
      "Experiencia en clubs, eventos privados y presentaciones en vivo.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="kz-section py-32 text-white"
    >
      <div className="kz-container">

        <SectionTitle
          title="ABOUT"
          subtitle="DJ · Producer · Electronic Music"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Biography */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-bold tracking-[0.35em] text-cyan-400">
              KENJI ZAN
            </p>

            <h3 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              ENERGY.
              <br />
              EMOTION.
              <br />
              <span className="kz-text-glow text-cyan-400">
                EXPERIENCE.
              </span>
            </h3>

            <div className="mt-8 space-y-5 text-base leading-8 text-gray-400">

              <p>
                Kenji Zan es DJ y productor de música electrónica, con una
                propuesta enfocada en crear experiencias a través de la
                energía, la melodía y la conexión con el público.
              </p>

              <p>
                Su sonido explora géneros como Big Room House, Progressive
                House, Emotional Progressive House y Tech House, combinando
                diferentes elementos de la música electrónica para construir
                una identidad propia.
              </p>

              <p>
                Como DJ, busca que cada presentación tenga una evolución
                propia: comenzar, construir energía y llevar al público hacia
                momentos memorables.
              </p>

            </div>

            {/* Genres */}

            <div className="mt-10 flex flex-wrap gap-3">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="
                    rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-400/5
                    px-5
                    py-2
                    text-xs
                    font-bold
                    tracking-[0.15em]
                    text-cyan-300
                  "
                >
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}

          <div className="grid gap-5">
            {highlights.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                whileHover={{ x: 8 }}
                className="
                  kz-glass
                  group
                  rounded-3xl
                  p-7
                  transition
                  hover:border-cyan-400/30
                "
              >
                <div className="flex items-start gap-6">

                  <span className="text-sm font-black tracking-[0.2em] text-cyan-400">
                    {item.number}
                  </span>

                  <div>
                    <h4 className="text-2xl font-black">
                      {item.title}
                    </h4>

                    <p className="mt-3 leading-7 text-gray-400">
                      {item.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Artist statement */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            kz-glass
            kz-glow
            mt-16
            rounded-3xl
            p-8
            text-center
            md:p-12
          "
        >
          <p className="text-xl font-bold leading-relaxed md:text-3xl">
            Music is not only something you hear.
            <span className="text-cyan-400">
              {" "}It's something you experience.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}