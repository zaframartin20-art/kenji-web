"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import SetCard from "./SetCard";

const sets = [
  {
    number: "SET 01",
    title: "Big Room Journey",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-01.jpg",
    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",
  },

  {
    number: "SET 02",
    title: "Progressive Energy",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-02.jpg",
    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",
  },

  {
    number: "SET 03",
    title: "Festival Mode",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-03.jpg",
    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",
  },

  {
    number: "SET 04",
    title: "Final Destination",
    genre: "BIG ROOM HOUSE",
    duration: "30 MIN",
    image: "/images/sets/set-04.jpg",
    youtubeUrl: "",
    soundcloudUrl: "",
    localUrl: "",
  },
];

export default function Sets() {
  return (
    <section
      id="sets"
      className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-white"
    >
      {/* Background glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500
          blur-[160px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        <SectionTitle
          title="DJ SETS"
          subtitle="30-minute Big Room House sessions"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {sets.map((set, index) => (
            <motion.div
              key={set.number}
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
              }}
              transition={{
                delay: index * 0.12,
              }}
            >
              <SetCard {...set} />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}