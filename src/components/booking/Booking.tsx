"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      eventType: String(formData.get("eventType") || ""),
      location: String(formData.get("location") || ""),
      date: String(formData.get("date") || ""),
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to send booking request."
        );
      }

      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="booking"
      className="scroll-mt-24 bg-black px-6 py-32 text-white"
    >
      <div className="mx-auto max-w-5xl">

        <SectionTitle
          title="BOOKING"
          subtitle="Let's create something unforgettable"
        />

        <motion.form
          onSubmit={handleSubmit}
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

          {/* Name / Email */}

          <div className="grid gap-6 md:grid-cols-2">

            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
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
                placeholder:text-gray-600
                focus:border-cyan-400
              "
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
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
                placeholder:text-gray-600
                focus:border-cyan-400
              "
            />

          </div>

          {/* Event / Location */}

          <div className="grid gap-6 md:grid-cols-2">

            <select
              name="eventType"
              required
              defaultValue=""
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
            >
              <option value="" disabled>
                Event type
              </option>

              <option>Club</option>
              <option>Festival</option>
              <option>Private Event</option>
              <option>Corporate Event</option>
              <option>Wedding</option>
              <option>Other</option>
            </select>

            <input
              name="location"
              type="text"
              placeholder="City / Country"
              required
              className="
                rounded-full
                border
                border-white/10
                bg-black/40
                px-6
                py-4
                text-white
                outline-none
                placeholder:text-gray-600
                focus:border-cyan-400
              "
            />

          </div>

          {/* Date / Budget */}

          <div className="grid gap-6 md:grid-cols-2">

            <input
              name="date"
              type="date"
              required
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

            <select
              name="budget"
              defaultValue=""
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
            >
              <option value="" disabled>
                Estimated budget
              </option>

              <option>Not specified</option>
              <option>Under $5,000 MXN</option>
              <option>$5,000 - $10,000 MXN</option>
              <option>$10,000 - $20,000 MXN</option>
              <option>$20,000+ MXN</option>
            </select>

          </div>

          {/* Message */}

          <textarea
            name="message"
            placeholder="Tell me about your event..."
            rows={6}
            required
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
              placeholder:text-gray-600
              focus:border-cyan-400
            "
          />

          {/* Status */}

          {success && (
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/5
                p-4
                text-sm
                text-cyan-300
              "
            >
              <CheckCircle2 size={20} />

              <span>
                Your booking request has been received.
              </span>
            </div>
          )}

          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-400/20
                bg-red-400/5
                p-4
                text-sm
                text-red-300
              "
            >
              {error}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-full
              bg-cyan-400
              px-8
              py-4
              font-black
              text-black
              transition
              hover:scale-[1.02]
              hover:bg-cyan-300
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                SENDING...
              </>
            ) : (
              <>
                <Send size={20} />

                REQUEST BOOKING
              </>
            )}

          </button>

        </motion.form>

      </div>
    </section>
  );
}