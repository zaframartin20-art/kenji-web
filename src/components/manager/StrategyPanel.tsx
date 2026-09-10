export default function StrategyPanel() {
  const actions = [
    {
      title: "Analizar contenido existente",
      description: "Identificar patrones de formato, tema y rendimiento.",
    },
    {
      title: "Encontrar formatos ganadores",
      description: "Comparar Reels, DJ clips, música y contenido personal.",
    },
    {
      title: "Construir calendario",
      description: "Mantener una frecuencia sostenible y medible.",
    },
    {
      title: "Definir primera prueba",
      description: "Experimentar con una hipótesis antes de invertir.",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        Estrategia
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-white">
        Próximas acciones
      </h2>

      <div className="mt-6 space-y-3">
        {actions.map((action, index) => (
          <div
            key={action.title}
            className="flex gap-4 rounded-xl border border-white/5 bg-black/20 p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 text-sm text-cyan-400">
              {index + 1}
            </span>

            <div>
              <p className="text-sm font-medium text-gray-200">
                {action.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                {action.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
