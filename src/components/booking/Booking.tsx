"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Booking() {
  return (
    <section
      id="booking"
      className="bg-black px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-5xl">

        <SectionTitle
          title="BOOKING"
          subtitle="Let's create something unforgettable"
        />

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            grid
            gap-6
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            p-8
            backdrop-blur-xl
            md:p-12
          "
        >

          <div className="grid gap-6 md:grid-cols-2">

            <input
              type="text"
              placeholder="Your name"
              className="
                rounded-full
                border
                border-white/10
                bg-black/40
                px-6
                py-4
                text-white
                outline-none
                transition
                focus:border-cyan-400
              "
            />

            <input
              type="email"
              placeholder="Email address"
              className="
                rounded-full
                border
                border-white/10
                bg-black/40
                px-6
                py-4
                text-white
                outline-none
                transition
                focus:border-cyan-400
              "
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <select
              className="
                rounded-full
                border
                border-white/10
                bg-black/40
                px-6
                py-4
                text-gray-300
                outline-none
                focus:border-cyan-400
              "
              defaultValue=""
            >
              <option value="" disabled>
                Event type
              </option>

              <option>Club</option>
              <option>Festival</option>
              <option>Private Event</option>
              <option>Corporate Event</option>
              <option>Other</option>
            </select>

            <input
              type="text"
              placeholder="City / Country"
              className="
                rounded-full
                border
                border-white/10
                bg-black/40
                px-6
                py-4
                text-white
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          <input
            type="date"
            className="
              rounded-full
              border
              border-white/10
              bg-black/40
              px-6
              py-4
              text-white
              outline-none
              focus:border-cyan-400
            "
          />

          <textarea
            placeholder="Tell me about your event..."
            rows={6}
            className="
              resize-none
              rounded-3xl
              border
              border-white/10
              bg-black/40
              px-6
              py-5
              text-white
              outline-none
              focus:border-cyan-400
            "
          />

          <button
            type="submit"
            className="
              rounded-full
              bg-cyan-400
              px-8
              py-4
              font-black
              text-black
              transition
              hover:scale-[1.02]
              hover:bg-cyan-300
            "
          >
            REQUEST BOOKING
          </button>

        </motion.form>

      </div>
    </section>
  );
}