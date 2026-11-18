import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

const CART_STORAGE_KEY = "clozet-demo-cart";
const CART_EVENT = "clozet-cart-updated";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.image === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        typeof item.size === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
  const cart = readCart();
  const quantityToAdd =
    typeof item.quantity === "number" && Number.isInteger(item.quantity) && item.quantity > 0
      ? item.quantity
      : 1;
  const existing = cart.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantityToAdd);
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
      quantity: quantityToAdd,
    });
  }

  writeCart(cart);
}

export function updateCartItem(id: string, quantity: number) {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    writeCart(readCart().filter((item) => item.id !== id));
    return;
  }
  const cart = readCart().map((item) =>
    item.id === id ? { ...item, quantity: Math.min(99, Math.max(1, Math.floor(quantity))) } : item,
  );
  writeCart(cart);
}

export function removeFromCart(id: string) {
  writeCart(readCart().filter((item) => item.id !== id));
}

export function clearCart() {
  writeCart([]);
}

export function useCartItems() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      return readCart();
    }
    return [];
  });

  useEffect(() => {
    const update = () => setItems(readCart());
    update();
    window.addEventListener(CART_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CART_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return items;
}
