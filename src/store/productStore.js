import { create } from "zustand";
import { getProducts } from "../data/crud";

const useProductStore = create((set) => ({
	products: [],
	filteredProducts: [],
	fetchProducts: async () => {
		await getProducts((fetchedProducts) => {
			set({
				products: fetchedProducts,
				filteredProducts: fetchedProducts,
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
			return { filteredProducts: filtered };
		});
	},
	//sort products
	sortProducts: (sortOption) => {
		set((state) => {
			let sorted = [...state.filteredProducts];
			// Sort by price ascending
			if (sortOption === "price-asc") {
				sorted.sort((a, b) => a.price - b.price);
			} else if (
				// Sort by price descending
				sortOption === "price-desc"
			) {
				sorted.sort((a, b) => b.price - a.price);
			} else if (sortOption === "letter") {
				// Sort alphabetically
				sorted.sort((a, b) => a.title.localeCompare(b.title));
			}
			return { filteredProducts: sorted };
		});
	},
}));

export default useProductStore;
