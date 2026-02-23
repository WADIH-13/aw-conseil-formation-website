'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './types';

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  guestToken: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeCart: () => Promise<void>;
  addItem: (experienceId: string) => Promise<void>;
  removeItem: (experienceId: string) => Promise<void>;
  setCartData: (cartId: string, guestToken: string, items: CartItem[]) => void;
  clearError: () => void;
}

type CartStoreState = {
  items: CartItem[];
  cartId: string | null;
  guestToken: string | null;
  isLoading: boolean;
  error: string | null;
  initializeCart: () => Promise<void>;
  addItem: (experienceId: string) => Promise<void>;
  removeItem: (experienceId: string) => Promise<void>;
  setCartData: (cartId: string, guestToken: string, items: CartItem[]) => void;
  clearError: () => void;
};

const initialState: Omit<CartStoreState, 'initializeCart' | 'addItem' | 'removeItem' | 'setCartData' | 'clearError'> = {
  items: [],
  cartId: null,
  guestToken: null,
  isLoading: false,
  error: null,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      initializeCart: async () => {
        const state = get();
        if (state.cartId && state.guestToken) return; // Already initialized

        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/universe/cart', { method: 'POST' });
          if (res.ok) {
            const cart = await res.json();
            set({
              cartId: cart.id,
              guestToken: cart.guest_token || '',
              isLoading: false,
            });
          }
        } catch (err) {
          set({
            error: 'Failed to initialize cart',
            isLoading: false,
          });
        }
      },

      addItem: async (experienceId: string) => {
        let state = get();
        let cartId = state.cartId;
        let guestToken = state.guestToken;

        // Initialize if necessary
        if (!cartId || !guestToken) {
          await get().initializeCart();
          state = get();
          cartId = state.cartId;
          guestToken = state.guestToken;
        }

        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/universe/cart/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cart_id: cartId,
              experience_id: experienceId,
              action: 'add',
            }),
          });

          if (res.ok) {
            set((state: CartStoreState) => ({
              items: [...state.items, { experience_id: experienceId, cart_id: cartId } as CartItem],
              isLoading: false,
            }));
          }
        } catch (err) {
          set({
            error: 'Failed to add item to cart',
            isLoading: false,
          });
        }
      },

      removeItem: async (experienceId: string) => {
        const state = get();
        const cartId = state.cartId;
        const itemToRemove = state.items.find((i: CartItem) => i.experience_id === experienceId);

        if (!itemToRemove) return;

        set({ isLoading: true, error: null });
        try {
          await fetch('/api/universe/cart/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cart_id: cartId,
              experience_id: experienceId,
              action: 'remove',
            }),
          });

          set((state: CartStoreState) => ({
            items: state.items.filter((i) => i.experience_id !== experienceId),
            isLoading: false,
          }));
        } catch (err) {
          set({
            error: 'Failed to remove item',
            isLoading: false,
          });
        }
      },

      setCartData: (cartId: string, guestToken: string, items: CartItem[]) => {
        set({ cartId, guestToken, items });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'cart-store',
      partialize: (state: any) => ({
        cartId: state.cartId,
        guestToken: state.guestToken,
        items: state.items,
      }),
    }
  )
);
