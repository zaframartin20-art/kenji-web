"use client";

import { useMemo } from "react";
import { BrainCircuit, CheckCircle2, AlertTriangle } from "lucide-react";

type ContentItem = {
  type: string;
};

type Props = {
  content: ContentItem[];
};

export default function ManagerBrain({ content }: Props) {
  const analysis = useMemo(() => {
    const music = content.filter((item) => item.type === "Musica").length;
    const video = content.filter((item) => item.type === "Video").length;
    const images = content.filter((item) => item.type === "Imagen").length;

    const total = content.length;

    const recommendations: string[] = [];

    if (total === 0) {
      recommendations.push(
        "Sube contenido para iniciar el aprendizaje del Manager."
      );
    }

    if (music > 0) {
      recommendations.push(
        "Analizar las canciones disponibles y relacionarlas con futuros contenidos."
      );
    }

    if (video === 0) {
      recommendations.push(
        "Crear o subir clips de DJ para comenzar a construir una biblioteca audiovisual."
      );
    }

    if (images === 0) {
      recommendations.push(
        "Agregar fotografías de artista, shows y sesiones para reforzar la identidad visual."
      );
    }

    if (total >= 5) {
      recommendations.push(
        "Ya existe suficiente material inicial para comenzar a buscar patrones de contenido."
      );
    }

    return {
      music,
      video,
      images,
      total,
      recommendations,
    };
  }, [content]);

  return (
    <section className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
          <BrainCircuit size={21} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Inteligencia
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            Diagnóstico del Manager
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-gray-500">Música</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {analysis.music}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-gray-500">Video</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {analysis.video}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs text-gray-500">Imagen</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {analysis.images}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
          Próximas acciones
        </p>

        <div className="space-y-3">
          {analysis.recommendations.map((recommendation, index) => {
            const warning =
              analysis.total === 0 && index === 0;

            return (
              <div
                key={recommendation}
                className="flex gap-3 rounded-xl border border-white/5 bg-black/20 p-4"
              >
                {warning ? (
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-yellow-400"
                  />
                ) : (
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />
                )}

                <p className="text-sm leading-6 text-gray-400">
                  {recommendation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
