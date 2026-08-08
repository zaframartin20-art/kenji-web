"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface TrackProps {
  title: string;
  genre: string;
  year: string;
  image: string;
}

export default function TrackCard({
  title,
  genre,
  year,
  image,
}: TrackProps) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      className="
      group
      rounded-3xl
      overflow-hidden
      bg-white/5
      border
      border-white/10
      backdrop-blur-xl
      "
    >
      <div className="relative h-80">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-black/35"></div>

        <button
          className="
          absolute
          bottom-5
          right-5
          w-16
          h-16
          rounded-full
          bg-cyan-500
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
          transition
          "
        >
          <Play fill="black" color="black" />
        </button>

      </div>

      <div className="p-6">

        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <p className="text-gray-400 mt-2">
          {genre}
        </p>

        <p className="text-gray-500 text-sm">
          {year}
        </p>

      </div>

    </motion.div>
  );
}