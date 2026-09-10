"use client";

import {
  BarChart3,
  Database,
  Music2,
  Video,
  Image as ImageIcon,
  TrendingUp,
} from "lucide-react";

type Props = {
  contentCount?: number;
};

export default function ManagerAnalytics({
  contentCount = 0,
}: Props) {
  const metrics = [
    ["Contenido registrado", String(contentCount)],
    ["Publicaciones", "0"],
    ["Experimentos", "0"],
    ["Hipótesis validadas", "0"],
  ];

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Inteligencia
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Analytics
        </h2>

        <p className="mt-3 max-w-2xl text-gray-500">
          El historial de datos permitirá al Manager detectar patrones y
          tomar mejores decisiones.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([title, value]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <BarChart3 size={18} className="text-cyan-400" />

            <p className="mt-5 text-sm text-gray-500">
              {title}
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <Music2 size={20} className="text-cyan-400" />

          <h3 className="mt-4 font-semibold text-white">
            Música
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Próximamente: BPM, tonalidad, energía, género y estructura.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <Video size={20} className="text-cyan-400" />

          <h3 className="mt-4 font-semibold text-white">
            Video
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Próximamente: formato, duración, escenas y rendimiento.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <ImageIcon size={20} className="text-cyan-400" />

          <h3 className="mt-4 font-semibold text-white">
            Imagen
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Próximamente: identidad visual y clasificación de contenido.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6">
        <div className="flex items-start gap-3">
          <Database
            className="mt-0.5 shrink-0 text-cyan-400"
            size={20}
          />

          <div>
            <h3 className="font-semibold text-white">
              Estado del aprendizaje
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              El Manager todavía está recopilando información. No se
              realizarán recomendaciones de inversión hasta contar con
              suficientes datos.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-start gap-3">
          <TrendingUp
            className="mt-0.5 shrink-0 text-cyan-400"
            size={20}
          />

          <div>
            <h3 className="font-semibold text-white">
              Filosofía del Manager
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Primero experimentar orgánicamente. Después medir. Luego
              decidir si tiene sentido invertir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
