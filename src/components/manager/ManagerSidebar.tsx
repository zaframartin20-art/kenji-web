"use client";

export type ManagerSection =
  | "dashboard"
  | "content"
  | "bookings"
  | "calendar"
  | "strategy"
  | "analytics";

type Props = {
  activeSection: ManagerSection;
  onSectionChange: (section: ManagerSection) => void;
};

const sections: {
  id: ManagerSection;
  label: string;
  description: string;
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Centro de operaciones",
  },
  {
    id: "content",
    label: "Contenido",
    description: "Biblioteca y publicaciones",
  },
  {
    id: "bookings",
    label: "Bookings",
    description: "Solicitudes comerciales",
  },
  {
    id: "calendar",
    label: "Calendario",
    description: "Planificación",
  },
  {
    id: "strategy",
    label: "Estrategia",
    description: "Crecimiento y experimentos",
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Datos y rendimiento",
  },
];

export default function ManagerSidebar({
  activeSection,
  onSectionChange,
}: Props) {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#050505]">
      {/* HEADER */}
      <div className="border-b border-white/10 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Kenji Zan
        </p>

        <h1 className="mt-2 text-xl font-bold text-white">
          Manager AI
        </h1>

        <p className="mt-1 text-xs text-gray-600">
          Artist Operations
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {sections.map((section) => {
          const active =
            activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() =>
                onSectionChange(section.id)
              }
              className={`group w-full rounded-xl border p-4 text-left transition ${
                active
                  ? "border-cyan-400/20 bg-cyan-400/[0.08]"
                  : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    active
                      ? "text-cyan-300"
                      : "text-gray-300"
                  }`}
                >
                  {section.label}
                </span>

                {section.id === "bookings" && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      active
                        ? "bg-cyan-400"
                        : "bg-cyan-400/40"
                    }`}
                  />
                )}
              </div>

              <p
                className={`mt-1 text-[11px] ${
                  active
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {section.description}
              </p>
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
            System
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />

            <span className="text-xs text-gray-400">
              Manager activo
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}