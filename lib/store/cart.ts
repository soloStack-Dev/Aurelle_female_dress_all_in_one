import { create } from "zustand";

/**
 * Tiny in-memory commerce store.
 *
 * This is deliberately not persisted: it gives the UI real, shared state
 * (bag count + wishlist) without pretending a checkout backend exists.
 */
type CartState = {
  bag: Record<string, number>;
  wishlist: string[];
  addToBag: (id: string) => void;
  removeFromBag: (id: string) => void;
  toggleWishlist: (id: string) => void;
  bagCount: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  bag: {},
  wishlist: [],

  addToBag: (id) =>
    set((state) => ({
      bag: { ...state.bag, [id]: (state.bag[id] ?? 0) + 1 },
    })),

  removeFromBag: (id) =>
    set((state) => {
      const next = { ...state.bag };
      if (!next[id]) return state;
      if (next[id] === 1) delete next[id];
      else next[id] -= 1;
      return { bag: next };
    }),

  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((item) => item !== id)
        : [...state.wishlist, id],
    })),

  bagCount: () => Object.values(get().bag).reduce((total, qty) => total + qty, 0),
}));
