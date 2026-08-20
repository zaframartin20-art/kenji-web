"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const experiences = [
  {
    number: "01",
    title: "LIVE EVENTS",
    description:
      "Presentaciones en eventos privados y experiencias en vivo adaptadas al público y al concepto del evento.",
  },
  {
    number: "02",
    title: "CLUBS",
    description:
      "Sets orientados a clubs y espacios donde la energía, la selección musical y la transición entre tracks son protagonistas.",
  },
  {
    number: "03",
    title: "FESTIVAL ENERGY",
    description:
      "Una propuesta enfocada en Big Room House y Progressive House para construir momentos de alta energía.",
  },
  {
    number: "04",
    title: "PRODUCTION",
    description:
      "El trabajo como productor complementa la experiencia como DJ y permite desarrollar una identidad musical propia.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="kz-section py-32 text-white"
    >
      <div className="kz-container">

        <SectionTitle
          title="EXPERIENCE"
          subtitle="Live · Clubs · Events · Production"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">

          {experiences.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="
                kz-glass
                group
                rounded-3xl
                p-8
                transition
                hover:border-cyan-400/30
                hover:kz-glow
              "
            >
              <div className="flex items-start gap-6">

                <span className="text-sm font-black tracking-[0.2em] text-cyan-400">
                  {item.number}
                </span>

                <div>
                  <h3 className="text-2xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-400">
                    {item.description}
                  </p>
                </div>

              </div>
            </motion.article>
          ))}

        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            kz-glass
            kz-glow
            mt-10
            rounded-3xl
            p-8
            text-center
            md:p-12
          "
        >
          <p className="text-sm font-bold tracking-[0.3em] text-cyan-400">
            KENJI ZAN
          </p>

          <h3 className="mt-4 text-3xl font-black md:text-5xl">
            READY FOR THE NEXT STAGE.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            Una propuesta musical diseñada para conectar con el público,
            construir energía y crear experiencias memorables.
          </p>

          <a
            href="#booking"
            className="
              mt-8
              inline-flex
              rounded-full
              bg-cyan-400
              px-8
              py-4
              text-sm
              font-black
              text-black
              transition
              hover:scale-105
              hover:bg-cyan-300
            "
          >
            BOOK KENJI ZAN
          </a>
        </motion.div>

      </div>
    </section>
  );
}