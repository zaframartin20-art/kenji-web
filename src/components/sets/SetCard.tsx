"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SetPlayer from "./SetPlayer";

interface SetCardProps {
  number: string;
  title: string;
  genre: string;
  duration: string;
  image: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  localUrl?: string;
  tracklist: string[];
}

export default function SetCard({
  number,
  title,
  genre,
  duration,
  image,
  youtubeUrl,
  soundcloudUrl,
  localUrl,
  tracklist,
}: SetCardProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25 }}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          transition
          hover:border-cyan-400/40
        "
      >
        {/* Cover */}

        <div className="relative h-72 overflow-hidden">

          <img
            src={image}
            alt={title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          {/* Dark overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Set number */}

          <div className="absolute left-5 top-5">
            <span
              className="
                rounded-full
                border
                border-white/20
                bg-black/50
                px-4
                py-2
                text-xs
                font-bold
                tracking-[0.2em]
                text-cyan-400
                backdrop-blur-md
              "
            >
              {number}
            </span>
          </div>

          {/* Play button */}

          <button
            type="button"
            onClick={() => setIsPlayerOpen(true)}
            aria-label={`Play ${title}`}
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-16
              w-16
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-cyan-400
              text-xl
              text-black
              opacity-90
              shadow-[0_0_40px_rgba(34,211,238,0.35)]
              transition
              group-hover:scale-110
              group-hover:opacity-100
            "
          >
            ▶
          </button>

          {/* Duration */}

          <div className="absolute bottom-5 right-5">
            <span
              className="
                rounded-full
                bg-black/60
                px-3
                py-1
                text-xs
                font-bold
                text-white
                backdrop-blur-md
              "
            >
              {duration}
            </span>
          </div>

        </div>

        {/* Information */}

        <div className="p-6">

          <p className="text-xs font-semibold tracking-[0.3em] text-cyan-400">
            {genre}
          </p>

          <h3 className="mt-2 text-2xl font-black text-white">
            {title}
          </h3>

          <button
            type="button"
            onClick={() => setIsPlayerOpen(true)}
            className="
              mt-6
              w-full
              rounded-full
              border
              border-white/10
              py-3
              text-sm
              font-bold
              text-white
              transition
              hover:border-cyan-400
              hover:bg-cyan-400
              hover:text-black
            "
          >
            VIEW SET
          </button>

        </div>
      </motion.article>

      {/* Player */}

      {isPlayerOpen && (
        <SetPlayer
        title={title}
        youtubeUrl={youtubeUrl}
        soundcloudUrl={soundcloudUrl}
        localUrl={localUrl}
        tracklist={tracklist}
        onClose={() => setIsPlayerOpen(false)}
      />
      )}
    </>
  );
}