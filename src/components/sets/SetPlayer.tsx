"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

interface SetPlayerProps {
  title: string;
  genre?: string;
  duration?: string;
  image?: string;
  localUrl?: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  tracklist?: string[];
  onClose: () => void;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function SetPlayer({
  title,
  genre,
  duration,
  image,
  localUrl,
  youtubeUrl,
  soundcloudUrl,
  tracklist = [],
  onClose,
}: SetPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audio.removeEventListener("ended", handleEnded);
    };
  }, [localUrl]);

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
      console.error("Unable to play audio:", error);
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

  function toggleMute() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.volume > 0) {
      audio.volume = 0;
      setVolume(0);
    } else {
      audio.volume = 1;
      setVolume(1);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/85
        p-4
        backdrop-blur-xl
        md:p-8
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-5xl
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
          bg-neutral-950
          shadow-[0_0_100px_rgba(34,211,238,0.12)]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close player"
          className="
            absolute
            right-5
            top-5
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/60
            text-white
            backdrop-blur-md
            transition
            hover:border-cyan-400
            hover:bg-cyan-400
            hover:text-black
          "
        >
          <X size={20} />
        </button>

        {/* Header */}

        <div className="border-b border-white/10 px-6 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <Headphones
              size={18}
              className="text-cyan-400"
            />

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              DJ SET
            </p>
          </div>

          <h2 className="mt-2 pr-12 text-2xl font-black text-white md:text-3xl">
            {title}
          </h2>

          {genre && (
            <p className="mt-2 text-sm text-gray-500">
              {genre}
              {duration ? ` · ${duration}` : ""}
            </p>
          )}
        </div>

        {/* Main */}

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">

          {/* Cover */}

          <div className="relative min-h-[300px] overflow-hidden bg-black md:min-h-[500px]">
            {image ? (
              <>
                <img
                  src={image}
                  alt={title}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div className="absolute inset-0 bg-black/35" />

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Headphones
                  size={80}
                  className="text-cyan-400/30"
                />
              </div>
            )}
          </div>

          {/* Player / Tracklist */}

          <div className="flex flex-col p-6 md:p-8">

            {/* Audio */}

            {localUrl && (
              <audio
                ref={audioRef}
                src={localUrl}
                preload="metadata"
              />
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={!localUrl}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  {isPlaying ? (
                    <Pause
                      size={21}
                      fill="currentColor"
                    />
                  ) : (
                    <Play
                      size={21}
                      fill="currentColor"
                      className="ml-1"
                    />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {localUrl
                      ? "Direct Audio"
                      : "Audio unavailable"}
                  </p>
                </div>

              </div>

              {/* Progress */}

              <input
                type="range"
                min="0"
                max={audioDuration || 0}
                step="0.1"
                value={Math.min(
                  currentTime,
                  audioDuration || 0
                )}
                onChange={handleProgressChange}
                disabled={!audioDuration}
                aria-label="Track progress"
                className="
                  mt-6
                  h-1
                  w-full
                  cursor-pointer
                  accent-cyan-400
                "
              />

              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>
                  {formatTime(audioDuration)}
                </span>
              </div>

              {/* Volume */}

              <div className="mt-5 flex items-center gap-3">

                <button
                  type="button"
                  onClick={toggleMute}
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
                    <VolumeX size={19} />
                  ) : (
                    <Volume2 size={19} />
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
                    w-full
                    cursor-pointer
                    accent-cyan-400
                  "
                />

              </div>
            </div>

            {/* Tracklist */}

            {tracklist.length > 0 && (
              <div className="mt-8">

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-black tracking-[0.2em] text-white">
                    TRACKLIST
                  </h3>

                  <span className="text-xs text-gray-500">
                    {tracklist.length} TRACKS
                  </span>
                </div>

                <div className="space-y-2">
                  {tracklist.map((trackName, index) => (
                    <div
                      key={`${trackName}-${index}`}
                      className="
                        flex
                        items-center
                        gap-4
                        rounded-xl
                        border
                        border-white/5
                        bg-white/[0.02]
                        px-4
                        py-3
                        transition
                        hover:border-cyan-400/20
                        hover:bg-cyan-400/[0.03]
                      "
                    >
                      <span className="w-6 text-xs font-bold text-cyan-400">
                        {(index + 1)
                          .toString()
                          .padStart(2, "0")}
                      </span>

                      <span className="text-sm text-gray-300">
                        {trackName}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* External sources */}

            {(youtubeUrl || soundcloudUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">

                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      rounded-full
                      border
                      border-white/10
                      px-5
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:border-cyan-400
                      hover:bg-cyan-400
                      hover:text-black
                    "
                  >
                    YouTube
                  </a>
                )}

                {soundcloudUrl && (
                  <a
                    href={soundcloudUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      rounded-full
                      border
                      border-white/10
                      px-5
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:border-cyan-400
                      hover:bg-cyan-400
                      hover:text-black
                    "
                  >
                    SoundCloud
                  </a>
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}