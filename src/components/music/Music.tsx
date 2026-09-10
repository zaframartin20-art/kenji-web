"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Disc3,
} from "lucide-react";

import { artist } from "@/data/artist";
import MusicPlayer from "./MusicPlayer";

export default function Music() {
  return (
    <section
      id="music"
      className="kz-section relative py-28"
    >
      <div className="kz-container">

        {/* ================================
            HEADER
            ================================ */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-bold tracking-[0.4em] text-cyan-400">
            MUSIC
          </p>

          <h2 className="kz-text-glow text-5xl font-black tracking-tight md:text-7xl">
            {artist.name}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            DJ, producer and electronic music artist.
            <br />
            Official music, DJ sets and playlists.
          </p>
        </motion.div>

        {/* ================================
            ARTIST MUSIC PROFILE
            ================================ */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            kz-glass
            kz-glow
            mx-auto
            max-w-6xl
            overflow-hidden
            rounded-[2rem]
          "
        >
          <div className="grid md:grid-cols-2">

            {/* ================================
                VISUAL
                ================================ */}

            <div
              className="
                relative
                flex
                min-h-[380px]
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-cyan-500/10
                via-black
                to-black
              "
            >
              {/* Background glow */}

              <div
                className="
                  absolute
                  h-72
                  w-72
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />

              {/* Disc */}

              <div className="relative text-center">

                <div
                  className="
                    mx-auto
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-cyan-400/30
                    bg-black/60
                    text-cyan-400
                    shadow-[0_0_60px_rgba(34,211,238,0.18)]
                  "
                >
                  <Disc3 size={48} />
                </div>

                <p className="mt-8 text-xs font-bold tracking-[0.35em] text-cyan-400">
                  {artist.role}
                </p>

                <h3 className="mt-3 text-4xl font-black text-white">
                  {artist.name}
                </h3>

              </div>
            </div>

            {/* ================================
                ARTIST INFORMATION
                ================================ */}

            <div className="flex flex-col justify-center p-8 md:p-12">

              <p className="text-sm font-bold tracking-[0.3em] text-cyan-400">
                OFFICIAL MUSIC
              </p>

              <h3 className="mt-4 text-4xl font-black text-white">
                Listen to Kenji Zan.
              </h3>

              <p className="mt-5 leading-7 text-gray-400">
                Follow the official platforms of Kenji Zan for new
                releases, DJ sets, playlists and electronic music.
              </p>

              {/* Platforms */}

              <div className="mt-8 grid gap-3">

                {artist.platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-4
                      transition
                      hover:border-cyan-400/30
                      hover:bg-white/[0.05]
                    "
                  >
                    <div className="flex items-center justify-between gap-4">

                      {/* Platform information */}

                      <div>
                        <h4 className="font-black text-white">
                          {platform.name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {platform.description}
                        </p>
                      </div>

                      {/* Platform button */}

                      {platform.href ? (
                        <a
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-400
                            text-black
                            transition
                            hover:scale-105
                            hover:bg-cyan-300
                          "
                          aria-label={`Open ${platform.name}`}
                        >
                          <ExternalLink size={17} />
                        </a>
                      ) : (
                        <span
                          className="
                            shrink-0
                            rounded-full
                            border
                            border-white/10
                            px-3
                            py-1
                            text-[10px]
                            font-bold
                            tracking-wider
                            text-gray-500
                          "
                        >
                          COMING SOON
                        </span>
                      )}

                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>
        </motion.div>

        {/* ================================
            MUSIC PLAYER
            ================================ */}

        <MusicPlayer />

        {/* ================================
            PLAYLISTS
            ================================ */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="mt-20"
        >

          {/* Playlist title */}

          <div className="mb-8 flex items-center gap-4">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/40" />

            <p className="text-xs font-bold tracking-[0.3em] text-gray-500">
              PLAYLISTS
            </p>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400/40" />

          </div>

          {/* Playlist cards */}

          <div className="grid gap-6 md:grid-cols-3">

            {artist.playlists.map((playlist) => (
              <motion.div
                key={playlist.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="
                  kz-glass
                  rounded-2xl
                  p-6
                  transition
                  hover:border-cyan-400/30
                  hover:bg-white/[0.06]
                "
              >

                <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                  PLAYLIST
                </p>

                <h3 className="mt-3 text-xl font-black text-white">
                  {playlist.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {playlist.description}
                </p>

                {/* Playlist button */}

                {playlist.url ? (
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-cyan-400
                      px-5
                      py-2
                      text-xs
                      font-black
                      text-black
                      transition
                      hover:bg-cyan-300
                    "
                  >
                    OPEN PLAYLIST
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <span
                    className="
                      mt-5
                      inline-block
                      text-xs
                      font-bold
                      tracking-wider
                      text-gray-600
                    "
                  >
                    AVAILABLE SOON
                  </span>
                )}

              </motion.div>
            ))}

          </div>

        </motion.div>

        {/* ================================
            GENRES
            ================================ */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="mt-16"
        >

          <div className="flex flex-wrap justify-center gap-3">

            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-400/5
                  px-5
                  py-2
                  text-xs
                  font-bold
                  tracking-[0.15em]
                  text-cyan-300
                "
              >
                {genre}
              </span>
            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
}