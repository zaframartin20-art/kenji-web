"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const sets = [
  {
    title: "Big Room House Vol. 1",
    duration: "30 min",
    platform: "YouTube",
    url: "#",
  },
  {
    title: "Big Room House Vol. 2",
    duration: "30 min",
    platform: "YouTube",
    url: "#",
  },
  {
    title: "Big Room House Vol. 3",
    duration: "30 min",
    platform: "YouTube",
    url: "#",
  },
  {
    title: "Big Room House Vol. 4",
    duration: "30 min",
    platform: "YouTube",
    url: "#",
  },
];

export default function Sets() {
  return (
    <section
      id="sets"
      className="bg-neutral-950 text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-center"
        >
          DJ SETS
        </motion.h2>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Live performances & exclusive mixes
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {sets.map((set, index) => (

            <motion.a
              key={set.title}
              href={set.url}
              whileHover={{
                scale: 1.02,
                y: -6,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold">
                    {set.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {set.duration}
                  </p>

                </div>

                <div
                  className="
                  w-16
                  h-16
                  rounded-full
                  bg-cyan-500
                  flex
                  items-center
                  justify-center
                  group-hover:rotate-12
                  transition
                  "
                >
                  <Play fill="black" size={28} color="black" />
                </div>

              </div>

            </motion.a>

          ))}

        </div>

      </div>
    </section>
  );
}