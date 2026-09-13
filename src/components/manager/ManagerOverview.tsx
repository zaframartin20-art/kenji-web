"use client";

type Props = {
  contentCount: number;
  bookingCount: number;
  pendingBookings: number;
};

export default function ManagerOverview({
  contentCount,
  bookingCount,
  pendingBookings,
}: Props) {
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
          Analiza contenido, oportunidades y solicitudes reales de booking
          para construir progresivamente la estrategia de crecimiento de
          Kenji Zan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* CONTENIDO */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20">
          <p className="text-sm text-gray-400">
            Contenido
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {contentCount}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            elementos en biblioteca
          </p>
        </div>

        {/* BOOKINGS */}
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 transition hover:border-cyan-400/40">
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-400">
              Bookings
            </p>

            {pendingBookings > 0 && (
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                Nuevos
              </span>
            )}
          </div>

          <p className="mt-3 text-3xl font-bold text-white">
            {bookingCount}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {pendingBookings} pendientes de revisión
          </p>
        </div>

        {/* ALCANCE */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20">
          <p className="text-sm text-gray-400">
            Alcance
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            —
          </p>

          <p className="mt-2 text-xs text-gray-500">
            datos pendientes
          </p>
        </div>

        {/* CRECIMIENTO */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20">
          <p className="text-sm text-gray-400">
            Crecimiento
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            —
          </p>

          <p className="mt-2 text-xs text-gray-500">
            datos pendientes
          </p>
        </div>
      </div>

      {/* ACTIVIDAD DE BOOKING */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Actividad comercial
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              Solicitudes de booking
            </h3>
          </div>

          <div className="text-sm text-gray-500">
            Base de datos conectada
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-500">
              Solicitudes totales
            </p>

            <p className="mt-2 text-2xl font-semibold text-white">
              {bookingCount}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-500">
              Pendientes
            </p>

            <p className="mt-2 text-2xl font-semibold text-cyan-300">
              {pendingBookings}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-gray-500">
              Estado
            </p>

            <p className="mt-2 text-sm font-medium text-green-400">
              Base de datos activa
            </p>
          </div>
        </div>
      </div>

      {/* RECOMENDACIÓN */}
      <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Recomendación del Manager
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          Construyamos datos antes de gastar dinero.
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
          El Manager primero observará qué contenido funciona de forma
          orgánica y cómo evolucionan las oportunidades comerciales.
          Las pruebas pagadas llegarán solamente cuando exista suficiente
          información para justificar una hipótesis.
        </p>
      </div>
    </section>
  );
}