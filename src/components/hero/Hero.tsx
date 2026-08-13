"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background lights */}
      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-500/20
            blur-[120px]
          "
        />

        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-0
            top-1/4
            h-[350px]
            w-[350px]
            rounded-full
            bg-blue-600/20
            blur-[100px]
          "
        />

        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-0
            right-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-400/10
            blur-[100px]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />

      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            mb-6
            text-sm
            font-semibold
            tracking-[0.5em]
            text-cyan-400
          "
        >
          DJ · PRODUCER
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="
            text-6xl
            font-black
            tracking-[0.18em]
            md:text-8xl
            lg:text-9xl
          "
        >
          KENJI
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.35,
          }}
          className="
            text-5xl
            font-black
            tracking-[0.25em]
            text-white/80
            md:text-7xl
            lg:text-8xl
          "
        >
          ZAN
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          className="mx-auto mt-8 max-w-xl text-lg text-gray-400 md:text-xl"
        >
          Big Room House · Progressive House
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >

          <a
            href="#music"
            className="
              rounded-full
              bg-cyan-400
              px-8
              py-4
              font-black
              text-black
              transition
              hover:scale-105
              hover:bg-cyan-300
            "
          >
            ESCUCHAR MÚSICA
          </a>

          <a
            href="#sets"
            className="
              rounded-full
              border
              border-white/20
              px-8
              py-4
              font-bold
              text-white
              transition
              hover:border-cyan-400
              hover:bg-white
              hover:text-black
            "
          >
            VER DJ SETS
          </a>

        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          text-xs
          tracking-[0.4em]
          text-gray-500
        "
      >
        SCROLL
      </motion.div>

    </section>
  );
}