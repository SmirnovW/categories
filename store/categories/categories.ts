import { StateCreator } from "zustand";
import { CategoriesStore } from "store/categories/types";
import { ApplicationStore } from "store/types";

export const createCategoriesStore: StateCreator<
  ApplicationStore,
  [],
  [],
  CategoriesStore | null
> = (set): CategoriesStore => ({
  categories: [],
  setCategories: (categories) => set(() => ({ categories })),
});
