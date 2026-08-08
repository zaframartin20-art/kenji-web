"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About() {
  return (
    <section
      id="about"
      className="bg-neutral-950 text-white py-32"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="ABOUT ME"
          subtitle="The vision behind Kenji Zan"
        />

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Imagen */}

          <motion.div
            initial={{ opacity:0, x:-80 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
          >

            <div
              className="
              rounded-3xl
              overflow-hidden
              border
              border-cyan-500/20
              shadow-[0_0_40px_rgba(34,211,238,.2)]
              "
            >

              <img
                src="/images/artist.jpg"
                alt="Kenji Zan"
                className="w-full object-cover"
              />

            </div>

          </motion.div>

          {/* Texto */}

          <motion.div
            initial={{ opacity:0, x:80 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
          >

            <h3 className="text-4xl font-black mb-8">
              KENJI ZAN
            </h3>

            <p className="text-gray-300 leading-9 mb-6">

              Mexican DJ & Producer focused on
              Big Room House and Progressive House.

            </p>

            <p className="text-gray-400 leading-8">

              Every production is designed to deliver
              emotion, festival energy and unforgettable
              moments through powerful melodies and
              cinematic atmospheres.

            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div>

                <h2 className="text-5xl font-black text-cyan-400">
                  4+
                </h2>

                <p className="text-gray-400">
                  DJ Sets
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black text-cyan-400">
                  10+
                </h2>

                <p className="text-gray-400">
                  Productions
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}