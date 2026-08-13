"use client";

import { useEffect } from "react";

interface SetPlayerProps {
  title: string;
  youtubeUrl?: string;
  soundcloudUrl?: string;
  localUrl?: string;
  onClose: () => void;
}

export default function SetPlayer({
  title,
  youtubeUrl,
  soundcloudUrl,
  localUrl,
  onClose,
}: SetPlayerProps) {
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

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/80
        p-6
        backdrop-blur-xl
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-neutral-950
          shadow-[0_0_80px_rgba(34,211,238,0.12)]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-20
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
            transition
            hover:bg-cyan-400
            hover:text-black
          "
          aria-label="Close player"
        >
          ✕
        </button>

        {/* Header */}

        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
            DJ SET
          </p>

          <h2 className="mt-1 text-2xl font-black text-white">
            {title}
          </h2>
        </div>

        {/* Player */}

        <div className="aspect-video bg-black">

          {youtubeUrl ? (
            <iframe
              src={youtubeUrl}
              title={title}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : localUrl ? (
            <div className="flex h-full items-center justify-center p-8">
              <audio
                controls
                className="w-full"
                src={localUrl}
              >
                Tu navegador no soporta audio HTML5.
              </audio>
            </div>
          ) : soundcloudUrl ? (
            <iframe
              src={soundcloudUrl}
              title={title}
              className="h-full w-full"
              allow="autoplay"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl">🎧</div>

              <p className="mt-4 text-lg font-bold text-white">
                Set próximamente
              </p>

              <p className="mt-2 text-sm text-gray-500">
                El reproductor estará disponible cuando se publique el set.
              </p>
            </div>
          )}

        </div>

        {/* Sources */}

        <div className="flex flex-wrap gap-3 border-t border-white/10 p-5">

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-bold text-white transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-black"
            >
              YouTube
            </a>
          )}

          {soundcloudUrl && (
            <a
              href={soundcloudUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-bold text-white transition hover:border-cyan-400 hover:bg-cyan-400 hover:text-black"
            >
              SoundCloud
            </a>
          )}

          {localUrl && (
            <span className="rounded-full border border-cyan-400/30 px-5 py-2 text-sm font-bold text-cyan-400">
              Direct Audio
            </span>
          )}

        </div>

      </div>
    </div>
  );
}