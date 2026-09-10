"use client";

import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface Track {
  title: string;
  genre: string;
  year: string;
  audio: string;
}

const track: Track = {
  title: "Kenji Zan — DJ Set 01",
  genre: "Big Room / Progressive House",
  year: "2026",
  audio: "/audio/kenji-zan-set-01.mp3",
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    function handleTimeUpdate() {
      setCurrentTime(audio!.currentTime);
    }

    function handleLoadedMetadata() {
      setDuration(audio!.duration);
    }

    function handleEnded() {
      setIsPlaying(false);
      setCurrentTime(0);
    }

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, []);

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error(
        "Unable to play audio:",
        error
      );
    }
  }

  function handleProgressChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleVolumeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const audio = audioRef.current;

    if (!audio) return;

    const newVolume = Number(event.target.value);

    audio.volume = newVolume;
    setVolume(newVolume);
  }

  return (
    <section className="mt-20">
      <audio
        ref={audioRef}
        src={track.audio}
        preload="metadata"
      />

      <div
        className="
          kz-glass
          kz-glow
          mx-auto
          max-w-5xl
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
        "
      >
        <div className="p-6 md:p-8">

          {/* Header */}

          <div className="mb-6">
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              OFFICIAL TRACK
            </p>

            <div className="mt-3 flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <h3 className="text-2xl font-black text-white md:text-3xl">
                  {track.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {track.genre} · {track.year}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}

          <div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={handleProgressChange}
              disabled={!duration}
              aria-label="Track progress"
              className="
                h-1
                w-full
                cursor-pointer
                accent-cyan-400
              "
            />

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}

          <div className="mt-6 flex items-center justify-between gap-4">

            {/* Play */}

            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? "Pause track"
                  : "Play track"
              }
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-cyan-400
                text-black
                shadow-[0_0_30px_rgba(34,211,238,0.2)]
                transition
                hover:scale-105
                hover:bg-cyan-300
              "
            >
              {isPlaying ? (
                <Pause size={22} fill="currentColor" />
              ) : (
                <Play
                  size={22}
                  fill="currentColor"
                  className="ml-1"
                />
              )}
            </button>

            {/* Volume */}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const audio = audioRef.current;

                  if (!audio) return;

                  if (audio.volume > 0) {
                    audio.volume = 0;
                    setVolume(0);
                  } else {
                    audio.volume = 1;
                    setVolume(1);
                  }
                }}
                aria-label={
                  volume === 0
                    ? "Unmute"
                    : "Mute"
                }
                className="
                  text-gray-400
                  transition
                  hover:text-cyan-400
                "
              >
                {volume === 0 ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="
                  hidden
                  w-24
                  cursor-pointer
                  accent-cyan-400
                  sm:block
                "
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}