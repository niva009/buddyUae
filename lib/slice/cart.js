'use Client';

import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const { cartItems } = get();
        const isItemInCart = cartItems.some(
          (cartItem) => cartItem?.product_id === item?.product_id
        );
        if (!isItemInCart) {
          set((state) => ({
            cartItems: [...state.cartItems, { ...item, quantity: 1 }],
          }));
          toast.success("Item added to the cart");
        } else {
          toast.error("Item is already in the cart");
        }
      },
      removeItemFromCart: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item?.product_id !== itemId
          ),
        }));
      },
      updateCartItemQuantity: (itemId, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item?.product_id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      saveCart: (items) => {
        set(() => ({
          cartItems: items,
        }));
      },
      clearCart: () => {
        set(() => ({
          cartItems: [],
        }));
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
