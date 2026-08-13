"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-16 text-center">

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-6 h-[2px] bg-cyan-400"
      />

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          text-4xl
          font-black
          tracking-[0.18em]
          text-white
          md:text-6xl
        "
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-gray-500"
        >
          {subtitle}
        </motion.p>
      )}

    </div>
  );
}