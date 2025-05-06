import { create } from "zustand";
import { getProducts } from "../data/crud";

const useProductStore = create((set) => ({
  products: [],
  filteredProducts: [],
  fetchProducts: async () => {
    await getProducts((fetchedProducts) => {
      set({
		products: fetchedProducts,
		filteredProducts: fetchedProducts
	   });
    });
  },

  //search state
  filterProducts: (searchTerm) => {
	set((state) => {
		const term = searchTerm.toLowerCase();
		const filtered = state.products.filter((product) =>
		product.title.toLowerCase().includes(term)
	);
	return {filteredProducts: filtered}
	});
  }
}));

export default useProductStore;