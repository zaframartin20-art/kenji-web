"use client";

import { CalendarDays, CheckCircle2 } from "lucide-react";

const plans = [
  {
    day: "Lunes",
    content: "Contenido musical",
    status: "Planificado",
  },
  {
    day: "Miércoles",
    content: "Reel / DJ performance",
    status: "Planificado",
  },
  {
    day: "Viernes",
    content: "Contenido de artista",
    status: "Planificado",
  },
  {
    day: "Domingo",
    content: "Recap / comunidad",
    status: "Pendiente",
  },
];

export default function ManagerCalendar() {
  return (
    <section>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Publicación
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Calendario
        </h2>

        <p className="mt-3 max-w-2xl text-gray-500">
          Una estructura inicial para mantener continuidad sin publicar
          contenido por publicar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.day}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-cyan-400" />

                <span className="font-semibold text-white">
                  {plan.day}
                </span>
              </div>

              <span className="text-xs text-cyan-400">
                {plan.status}
              </span>
            </div>

            <p className="mt-6 text-sm text-gray-300">
              {plan.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 text-cyan-400" size={19} />

          <div>
            <p className="font-medium text-white">
              Regla del Manager
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              La frecuencia se podra modificar posteriormente utilizando
              datos reales de rendimiento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
