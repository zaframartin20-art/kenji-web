"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FileAudio, FileImage, FileVideo, Trash2, Upload } from "lucide-react";

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

function getFileType(file: File) {
  if (file.type.startsWith("image/")) return "Imagen";
  if (file.type.startsWith("video/")) return "Video";
  if (file.type.startsWith("audio/")) return "Musica";
  return "Archivo";
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveItem(item: ContentItem) {
  const db = await openDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(item);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function getItems(): Promise<ContentItem[]> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => {
      const result = request.result as ContentItem[];

      resolve(
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
      );
    };

    request.onerror = () => reject(request.error);
  });
}

async function deleteItem(id: string) {
  const db = await openDatabase();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(id);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

function FileIcon({ type }: { type: string }) {
  if (type === "Video") {
    return <FileVideo size={20} />;
  }

  if (type === "Imagen") {
    return <FileImage size={20} />;
  }

  return <FileAudio size={20} />;
}

export default function ContentManager() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems()
      .then(setContent)
      .catch((error) => {
        console.error("Error loading content:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleUpload() {
    inputRef.current?.click();
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const newItems: ContentItem[] = [];

    for (const file of Array.from(files)) {
      const item: ContentItem = {
        id: crypto.randomUUID(),
        name: file.name,
        type: getFileType(file),
        mimeType: file.type,
        size: formatSize(file.size),
        createdAt: new Date().toISOString(),
        file,
      };

      await saveItem(item);
      newItems.push(item);
    }

    setContent((current) => [...newItems, ...current]);

    event.target.value = "";
  }

  async function handleDelete(id: string) {
    await deleteItem(id);
    setContent((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Biblioteca
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Contenido
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {content.length} elemento{content.length === 1 ? "" : "s"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleUpload}
          className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-300"
        >
          <Upload size={16} />
          Subir contenido
        </button>
      </div>

      {loading ? (
        <div className="mt-8 flex min-h-48 items-center justify-center rounded-xl border border-white/10">
          <p className="text-sm text-gray-500">
            Cargando biblioteca...
          </p>
        </div>
      ) : content.length === 0 ? (
        <div className="mt-8 flex min-h-48 items-center justify-center rounded-xl border border-dashed border-white/10">
          <div className="text-center">
            <Upload className="mx-auto text-gray-600" size={28} />

            <p className="mt-4 text-gray-400">
              Todavia no hay contenido.
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Sube musica, videos o fotografias para comenzar.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {content.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-cyan-400/20"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  <FileIcon type={item.type} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.type} · {item.size}
                  </p>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-3">
                <span className="hidden rounded-full border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 text-xs text-yellow-400 md:block">
                  Pendiente
                </span>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg p-2 text-gray-600 transition hover:bg-red-400/10 hover:text-red-400"
                  aria-label={`Eliminar ${item.name}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
