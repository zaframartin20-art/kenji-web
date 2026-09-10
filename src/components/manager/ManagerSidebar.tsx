"use client";

import {
  LayoutDashboard,
  FileVideo,
  CalendarDays,
  Lightbulb,
  BarChart3,
} from "lucide-react";

export type ManagerSection =
  | "dashboard"
  | "content"
  | "calendar"
  | "strategy"
  | "analytics";

type Props = {
  activeSection: ManagerSection;
  onSectionChange: (section: ManagerSection) => void;
};

const items = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "content" as const, label: "Contenido", icon: FileVideo },
  { id: "calendar" as const, label: "Calendario", icon: CalendarDays },
  { id: "strategy" as const, label: "Estrategia", icon: Lightbulb },
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
];

export default function ManagerSidebar({
  activeSection,
  onSectionChange,
}: Props) {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#080808] p-6">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Kenji Zan
        </p>

        <h1 className="mt-2 text-xl font-semibold text-white">
          Manager AI
        </h1>

        <p className="mt-2 text-xs leading-5 text-gray-600">
          Centro de operaciones del proyecto artístico.
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${
                active
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-cyan-400"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-10">
        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">
            AI Status
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

            <span className="text-sm text-gray-300">
              Sistema activo
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-600">
            Modo de análisis progresivo.
          </p>
        </div>
      </div>
    </aside>
  );
}
