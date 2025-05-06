import { create } from "zustand";
import { getProducts } from "../data/crud";

const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    await getProducts((fetchedProducts) => {
      set({ products: fetchedProducts });
    });
  },
}));

export default useProductStore;