import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: (item) => {
        const { wishlistItems } = get();
        const isItemInWishlist = wishlistItems.some(
          (wishlistItem) => wishlistItem.id === item.id
        );

        if (!isItemInWishlist) {
          set((state) => ({
            wishlistItems: [...state.wishlistItems, item],
          }));
        } else {
          console.log("Item is already in the wishlist");
        }
      },
      removeItemFromWishlist: (itemId) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) => item.id !== itemId
          ),
        }));
      },
      saveWishlist: (items) => {
        set(() => ({
          wishlistItems: items,
        }));
      },
    }),
    {
      name: "wishlist-storage",
      getStorage: () => localStorage,
    }
  )
);
