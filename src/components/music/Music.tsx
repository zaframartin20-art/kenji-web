"use client";

import TrackCard from "./TrackCard";
import SectionTitle from "@/components/ui/SectionTitle";

const tracks = [
  {
    title: "SUN",
    genre: "Big Room House",
    year: "2026",
    image: "/images/sun.jpg",
  },
  {
    title: "SKY",
    genre: "Big Room House",
    year: "2026",
    image: "/images/sky.jpg",
  },
  {
    title: "Feel The World",
    genre: "Progressive House",
    year: "2026",
    image: "/images/feel-the-world.jpg",
  },
];

export default function Music() {
  return (
    <section
      id="music"
      className="bg-black text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <SectionTitle
          title="MUSIC"
          subtitle="Official Releases"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tracks.map((track) => (
            <TrackCard
              key={track.title}
              title={track.title}
              genre={track.genre}
              year={track.year}
              image={track.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}