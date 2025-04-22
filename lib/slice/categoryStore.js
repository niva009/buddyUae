
import { create } from 'zustand';

export const useCategoryStore = create((set) => ({
  selectedCategoryId: null,
  setCategoryId: (id) => set({ selectedCategoryId: id }),
}));
