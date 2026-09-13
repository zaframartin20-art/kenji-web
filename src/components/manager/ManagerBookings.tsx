"use client";

import { useMemo, useState } from "react";

type BookingStatus =
  | "PENDING"
  | "REVIEWED"
  | "CONFIRMED"
  | "REJECTED"
  | "COMPLETED";

type Booking = {
  id: number;
  name: string;
  email: string;
  eventType: string;
  location: string;
  date: string;
  budget: string | null;
  message: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  bookings: Booking[];
};

type Opportunity = {
  score: number;
  level: "ALTA" | "MEDIA" | "BAJA";
  reasons: string[];
};

function statusLabel(status: BookingStatus) {
  switch (status) {
    case "PENDING":
      return "Pendiente";
    case "REVIEWED":
      return "Revisado";
    case "CONFIRMED":
      return "Confirmado";
    case "REJECTED":
      return "Rechazado";
    case "COMPLETED":
      return "Completado";
  }
}

function statusClass(status: BookingStatus) {
  switch (status) {
    case "PENDING":
      return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";
    case "REVIEWED":
      return "border-blue-400/20 bg-blue-400/10 text-blue-300";
    case "CONFIRMED":
      return "border-green-400/20 bg-green-400/10 text-green-300";
    case "REJECTED":
      return "border-red-400/20 bg-red-400/10 text-red-300";
    case "COMPLETED":
      return "border-white/10 bg-white/5 text-gray-300";
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function parseBudget(budget: string | null) {
  if (!budget) {
    return {
      amount: 0,
      label: "No especificado",
    };
  }

  const normalized = budget
    .replace(/,/g, "")
    .replace(/\$/g, "");

  const numbers = normalized.match(/\d+(?:\.\d+)?/g);

  if (!numbers || numbers.length === 0) {
    return {
      amount: 0,
      label: budget,
    };
  }

  const values = numbers.map(Number);
  const amount = Math.max(...values);

  if (amount >= 20000) {
    return {
      amount,
      label: "Alto",
    };
  }

  if (amount >= 10000) {
    return {
      amount,
      label: "Medio",
    };
  }

  return {
    amount,
    label: "Bajo",
  };
}

function analyzeOpportunity(
  booking: Booking
): Opportunity {
  let score = 0;
  const reasons: string[] = [];

  const budget = parseBudget(booking.budget);

  if (budget.amount >= 20000) {
    score += 40;
    reasons.push("Presupuesto alto");
  } else if (budget.amount >= 10000) {
    score += 25;
    reasons.push("Presupuesto medio");
  } else if (budget.amount > 0) {
    score += 10;
    reasons.push("Presupuesto identificado");
  }

  const event = booking.eventType.toLowerCase();

  if (
    event.includes("festival") ||
    event.includes("corporativo") ||
    event.includes("concert") ||
    event.includes("concierto")
  ) {
    score += 25;
    reasons.push("Tipo de evento estratégico");
  }

  const daysUntil =
    (new Date(booking.date).getTime() -
      Date.now()) /
    (1000 * 60 * 60 * 24);

  if (daysUntil >= 0 && daysUntil <= 60) {
    score += 20;
    reasons.push("Evento próximo");
  } else if (daysUntil > 60 && daysUntil <= 180) {
    score += 10;
    reasons.push("Evento con planificación anticipada");
  }

  if (booking.message.trim().length >= 80) {
    score += 10;
    reasons.push("Solicitud con información detallada");
  }

  if (booking.status === "PENDING") {
    score += 5;
    reasons.push("Requiere atención");
  }

  if (score >= 60) {
    return {
      score: Math.min(score, 100),
      level: "ALTA",
      reasons,
    };
  }

  if (score >= 35) {
    return {
      score,
      level: "MEDIA",
      reasons,
    };
  }

  return {
    score,
    level: "BAJA",
    reasons,
  };
}

function opportunityClass(
  level: Opportunity["level"]
) {
  switch (level) {
    case "ALTA":
      return "border-green-400/20 bg-green-400/10 text-green-300";

    case "MEDIA":
      return "border-yellow-400/20 bg-yellow-400/10 text-yellow-300";

    case "BAJA":
      return "border-white/10 bg-white/5 text-gray-400";
  }
}

function createCalendarFile(
  booking: Booking
) {
  const start = new Date(
    `${booking.date.slice(0, 10)}T20:00:00`
  );

  const end = new Date(start);
  end.setHours(end.getHours() + 2);

  const formatICSDate = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

  const escapeICS = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kenji Zan//Manager AI//ES",
    "BEGIN:VEVENT",
    `UID:booking-${booking.id}@kenjizan.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${escapeICS(
      `Kenji Zan - ${booking.eventType}`
    )}`,
    `LOCATION:${escapeICS(booking.location)}`,
    `DESCRIPTION:${escapeICS(
      `Booking de ${booking.name}\\n${booking.email}\\n\\n${booking.message}`
    )}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `booking-${booking.id}.ics`;
  link.click();

  URL.revokeObjectURL(url);
}

async function updateBookingStatus(
  id: number,
  status: BookingStatus
) {
  const response = await fetch(
    "/api/manager/bookings",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo actualizar el booking."
    );
  }
}

export default function ManagerBookings({
  bookings,
}: Props) {
  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const rankedBookings = useMemo(() => {
    return bookings
      .map((booking) => ({
        booking,
        opportunity:
          analyzeOpportunity(booking),
      }))
      .sort(
        (a, b) =>
          b.opportunity.score -
          a.opportunity.score
      );
  }, [bookings]);

  const topBooking = rankedBookings[0];

  async function handleStatusChange(
    booking: Booking,
    status: BookingStatus
  ) {
    try {
      setUpdatingId(booking.id);

      await updateBookingStatus(
        booking.id,
        status
      );

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "No se pudo actualizar el estado del booking."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function contactClient(
    booking: Booking
  ) {
    const subject = encodeURIComponent(
      `Kenji Zan - ${booking.eventType}`
    );

    const body = encodeURIComponent(
      `Hola ${booking.name},\n\n` +
        `Gracias por contactar a Kenji Zan.\n\n` +
        `Nos gustaría revisar los detalles de tu evento:\n\n` +
        `Evento: ${booking.eventType}\n` +
        `Fecha: ${formatDate(booking.date)}\n` +
        `Ubicación: ${booking.location}\n` +
        `Presupuesto: ${
          booking.budget || "No especificado"
        }\n\n` +
        `Mensaje recibido:\n${booking.message}\n\n` +
        `Saludos,\nKenji Zan`
    );

    window.location.href =
      `mailto:${booking.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section>
      {/* HEADER */}

      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Manager AI
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Bookings
        </h2>

        <p className="mt-3 max-w-2xl text-gray-500">
          Gestiona, analiza y prioriza las
          oportunidades comerciales recibidas
          desde el sitio oficial.
        </p>
      </div>

      {/* AI PRIORITY */}

      {topBooking && (
        <div className="mb-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Recomendación del Manager AI
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Priorizar booking #
                {topBooking.booking.id}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {topBooking.booking.name} ·{" "}
                {topBooking.booking.eventType} ·{" "}
                {topBooking.booking.location}
              </p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-xs text-gray-600">
                PRIORIDAD
              </p>

              <p className="mt-1 text-3xl font-bold text-cyan-300">
                {topBooking.opportunity.score}/100
              </p>

              <p className="text-xs text-gray-500">
                oportunidad{" "}
                {topBooking.opportunity.level.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {topBooking.opportunity.reasons.map(
              (reason) => (
                <span
                  key={reason}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-400"
                >
                  {reason}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* EMPTY */}

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <p className="text-gray-400">
            No hay solicitudes de booking todavía.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {rankedBookings.map(
            ({
              booking,
              opportunity,
            }) => {
              const budget = parseBudget(
                booking.budget
              );

              return (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20"
                >
                  {/* TOP */}

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-white">
                          {booking.name}
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusClass(
                            booking.status
                          )}`}
                        >
                          {statusLabel(
                            booking.status
                          )}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${opportunityClass(
                            opportunity.level
                          )}`}
                        >
                          ★{" "}
                          {opportunity.level}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {booking.email}
                      </p>
                    </div>

                    <div className="text-left lg:text-right">
                      <p className="text-xs uppercase tracking-wider text-gray-600">
                        Booking #
                        {booking.id}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {formatDate(
                          booking.createdAt
                        )}
                      </p>
                    </div>
                  </div>

                  {/* DATA */}

                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <p className="text-xs text-gray-600">
                        Evento
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        {booking.eventType}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">
                        Ubicación
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        {booking.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">
                        Fecha
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        {formatDate(
                          booking.date
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600">
                        Presupuesto
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        {booking.budget ||
                          "No especificado"}
                      </p>

                      <p className="mt-1 text-xs text-cyan-400/70">
                        Valoración:{" "}
                        {budget.label}
                      </p>
                    </div>
                  </div>

                  {/* OPPORTUNITY */}

                  <div className="mt-6 rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">
                          Análisis de oportunidad
                        </p>

                        <p className="mt-1 text-sm text-gray-300">
                          Score comercial
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <span className="text-2xl font-bold text-cyan-300">
                          {opportunity.score}
                        </span>

                        <span className="text-xs text-gray-600">
                          /100
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all"
                        style={{
                          width: `${opportunity.score}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {opportunity.reasons.map(
                        (reason) => (
                          <span
                            key={reason}
                            className="text-xs text-gray-500"
                          >
                            • {reason}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div className="mt-6 border-t border-white/5 pt-5">
                    <p className="text-xs text-gray-600">
                      Mensaje
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {booking.message}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        contactClient(
                          booking
                        )
                      }
                      className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/20"
                    >
                      ✉ Contactar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        createCalendarFile(
                          booking
                        )
                      }
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/[0.07]"
                    >
                      📅 Calendario
                    </button>

                    <select
                      value={booking.status}
                      disabled={
                        updatingId ===
                        booking.id
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          booking,
                          event.target
                            .value as BookingStatus
                        )
                      }
                      className="rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-2 text-xs text-gray-300 outline-none focus:border-cyan-400/30"
                    >
                      <option value="PENDING">
                        Pendiente
                      </option>

                      <option value="REVIEWED">
                        Revisado
                      </option>

                      <option value="CONFIRMED">
                        Confirmado
                      </option>

                      <option value="REJECTED">
                        Rechazado
                      </option>

                      <option value="COMPLETED">
                        Completado
                      </option>
                    </select>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}