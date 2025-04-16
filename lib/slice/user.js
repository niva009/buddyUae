'use client"; '
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: {},
  clientsecret: "",
  setUser: (user) => {
    set((state) => ({
      user: user,
    }));
  },
  addClientSecret: (secret) => {
    set((state) => ({
      clientsecret: secret,
    }));
  },
}));
