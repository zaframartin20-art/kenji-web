"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">

      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/festival.mp4" type="video/mp4" />
      </video>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-9xl font-black tracking-[0.25em] text-white"
        >
          KENJI ZAN
        </motion.h1>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xl md:text-2xl text-gray-300"
        >
          Big Room House • Progressive House
        </motion.p>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex justify-center gap-5"
        >

          <button className="
          bg-cyan-500 
          text-black 
          px-8 py-4 
          rounded-full 
          font-bold
          hover:scale-110
          transition
          ">
            Escuchar Música
          </button>


          <button className="
          border 
          border-white 
          text-white 
          px-8 py-4 
          rounded-full
          hover:bg-white
          hover:text-black
          transition
          ">
            DJ Sets
          </button>

        </motion.div>

      </div>

    </section>
  );
}