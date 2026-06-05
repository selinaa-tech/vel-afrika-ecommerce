import { useEffect, useState, useCallback } from "react";

export type Collection = {
  id: string;
  name: string;
  emoji: string;
  productIds: string[];
  createdAt: number;
};

const KEY = "velafrika:collections";

function read(): Collection[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // seed
  const seed: Collection[] = [
    { id: "favs", name: "My Favourites", emoji: "❤️", productIds: ["1", "3"], createdAt: Date.now() },
    { id: "gifts", name: "Gift Ideas", emoji: "🎁", productIds: ["2"], createdAt: Date.now() },
  ];
  try { localStorage.setItem(KEY, JSON.stringify(seed)); } catch {}
  return seed;
}

function write(c: Collection[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
    window.dispatchEvent(new CustomEvent("velafrika:collections-changed"));
  } catch {}
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(read());
    const on = () => setCollections(read());
    window.addEventListener("velafrika:collections-changed", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("velafrika:collections-changed", on);
      window.removeEventListener("storage", on);
    };
  }, []);

  const toggleProduct = useCallback((collectionId: string, productId: string) => {
    const list = read();
    const idx = list.findIndex((c) => c.id === collectionId);
    if (idx === -1) return;
    const has = list[idx].productIds.includes(productId);
    list[idx] = {
      ...list[idx],
      productIds: has
        ? list[idx].productIds.filter((p) => p !== productId)
        : [...list[idx].productIds, productId],
    };
    write(list);
  }, []);

  const createCollection = useCallback((name: string, emoji = "✨") => {
    const list = read();
    const id = `c-${Date.now()}`;
    list.unshift({ id, name, emoji, productIds: [], createdAt: Date.now() });
    write(list);
    return id;
  }, []);

  const removeCollection = useCallback((id: string) => {
    write(read().filter((c) => c.id !== id));
  }, []);

  const isSaved = useCallback(
    (productId: string) => collections.some((c) => c.productIds.includes(productId)),
    [collections],
  );

  return { collections, toggleProduct, createCollection, removeCollection, isSaved };
}

export async function shareCollection(c: Collection) {
  const url = `${window.location.origin}/collections?shared=${c.id}`;
  const data = { title: `Vel'Afrika — ${c.name}`, text: `Check out my "${c.name}" collection on Vel'Afrika`, url };
  if (navigator.share) {
    try { await navigator.share(data); return; } catch {}
  }
  try {
    await navigator.clipboard.writeText(url);
    alert("Share link copied to clipboard");
  } catch {
    alert(url);
  }
}
