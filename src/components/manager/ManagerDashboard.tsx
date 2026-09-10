"use client";

import { useEffect, useState } from "react";

import ManagerSidebar, {
  type ManagerSection,
} from "./ManagerSidebar";

import ManagerOverview from "./ManagerOverview";
import ContentManager from "./ContentManager";
import StrategyPanel from "./StrategyPanel";
import ManagerCalendar from "./ManagerCalendar";
import ManagerAnalytics from "./ManagerAnalytics";
import ManagerBrain from "./ManagerBrain";

type ContentItem = {
  id: string;
  name: string;
  type: string;
  mimeType: string;
  size: string;
  createdAt: string;
  file: Blob;
};

const DB_NAME = "kenji-manager";
const STORE_NAME = "content";

async function getContent(): Promise<ContentItem[]> {
  if (typeof window === "undefined") {
    return [];
  }

  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readonly");
      const requestItems = transaction.objectStore(STORE_NAME).getAll();

      requestItems.onsuccess = () => {
        resolve(requestItems.result as ContentItem[]);
      };

      requestItems.onerror = () => {
        resolve([]);
      };
    };

    request.onerror = () => {
      resolve([]);
    };
  });
}

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] =
    useState<ManagerSection>("dashboard");

  const [content, setContent] = useState<ContentItem[]>([]);

  useEffect(() => {
    getContent().then(setContent);

    const interval = window.setInterval(() => {
      getContent().then(setContent);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  function renderSection() {
    switch (activeSection) {
      case "content":
        return (
          <div className="space-y-8">
            <ContentManager />
            <ManagerBrain content={content} />
          </div>
        );

      case "calendar":
        return <ManagerCalendar />;

      case "strategy":
        return (
          <div>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Manager AI
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Estrategia
              </h2>

              <p className="mt-3 max-w-2xl text-gray-500">
                El Manager organizará las próximas decisiones de crecimiento
                utilizando datos y experimentos.
              </p>
            </div>

            <StrategyPanel />

            <div className="mt-8">
              <ManagerBrain content={content} />
            </div>
          </div>
        );

      case "analytics":
        return <ManagerAnalytics contentCount={content.length} />;

      default:
        return (
          <div className="space-y-8">
            <ManagerOverview contentCount={content.length} />
            <ManagerBrain content={content} />
          </div>
        );
    }
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <ManagerSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="min-w-0 flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
