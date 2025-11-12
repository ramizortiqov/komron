import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) =>
        set((state) => {
          if (state.items.some((i) => i.productId === productId)) {
            return state;
          }
          return { items: [...state.items, { productId }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      isInWishlist: (productId) => {
        const state = get();
        return state.items.some((i) => i.productId === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'tm-limited-wishlist',
    }
  )
);
