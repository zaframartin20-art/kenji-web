"use client";

type Props = {
  contentCount: number;
};

export default function ManagerOverview({ contentCount }: Props) {
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          Manager AI
        </p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          Centro de operaciones
        </h2>

        <p className="mt-3 max-w-2xl text-gray-400">
          Analiza contenido, detecta oportunidades y construye
          progresivamente la estrategia de crecimiento de Kenji Zan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Contenido", String(contentCount), "elementos en biblioteca"],
          ["Alcance", "-", "datos pendientes"],
          ["Engagement", "-", "datos pendientes"],
          ["Crecimiento", "-", "datos pendientes"],
        ].map(([title, value, description]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-sm text-gray-400">{title}</p>

            <p className="mt-3 text-3xl font-bold text-white">
              {value}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Recomendacion del Manager
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          Construyamos datos antes de gastar dinero.
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
          El Manager primero observara que contenido funciona de forma
          organica. Las pruebas pagadas llegaran solamente cuando exista
          suficiente informacion para justificar una hipotesis.
        </p>
      </div>
    </section>
  );
}
