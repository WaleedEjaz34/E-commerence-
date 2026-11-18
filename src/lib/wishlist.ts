import { useEffect, useState } from "react";

const STORAGE_KEY = "clozet-demo-wishlist";
const WISHLIST_EVENT = "clozet-wishlist-updated";

export function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeWishlist(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}

export function toggleWishlist(id: string) {
  const saved = readWishlist();
  writeWishlist(saved.includes(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id]);
}

export function removeFromWishlist(id: string) {
  writeWishlist(readWishlist().filter((savedId) => savedId !== id));
}

export function useWishlistIds() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const update = () => setIds(readWishlist());
    update();
    window.addEventListener(WISHLIST_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return ids;
}
