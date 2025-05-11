import { create } from "zustand";
import { 
	getProducts as fetchProductsFromFirestore,
	addProduct as addProductToFirestore,
	updateProduct as updateProductInFirestore,
	removeProduct as removeProductFromFirestore,
} from "../data/crud";

const useProductStore = create((set, get) => ({
	products: [],
	filteredProducts: [],
	loading: false,
	error: null,
	filterTerm: "",
	sortOption: "price-asc",

	fetchProducts: async () => {
		set({ loading: true, error: null});
		try {
			const fetchedPorducts = await fetchProductsFromFirestore();
			console.log("Fetched products:", fetchedPorducts);

			set({
				products: fetchedPorducts,
				loading: false,
				error: null,
			});

			get().applyFilter(get().filterTerm);
			get().applySort(get().sortOption);
		} catch (error) { 
			console.error("Error fetching products:", error);
			set({ loading: false, error: "Failed to fetch products" });
		}

		//TODO maybe clear products if error/fail
	},

	addProduct: async (newItemData) => {
		set({ loading: true, error: null });
		try {
			const newItemRef = await addProductToFirestore(newItemData);
			const newItemWithId = { id: newItemRef.id, ...newItemData };

			console.log("Added item with ID:", newItemRef.id);
			set(state => {
				const updatedProducts = [...state.products, newItemWithId];
				const filtered = updatedProducts.filter(product =>
					product.title.toLowerCase().includes(state.filterTerm.toLowerCase()) ||
					product.category.toLowerCase().includes(state.filterTerm.toLowerCase())
				);
				let sorted = [...filtered];
				//sort according to current sort option
				if (state.sortOption === "price-asc") {
					sorted.sort((a, b) => a.price - b.price);
				} else if (state.sortOption === "price-desc") {
					sorted.sort((a, b) => b.price - a.price);
				} else if (state.sortOption === "letter") {
					sorted.sort((a, b) => a.title.localeCompare(b.title));
				}
				return {
					products: updatedProducts,
					filteredProducts: sorted,
					loading: false,
					error: null,
				};
		});
	} catch (error) {
		console.error("Failed to add item:", error);
		set({ loading: false, error: "Failed to add item" });
		throw error;
	}
},

updateProduct:  async (updatedProductObject) => {
	set({ loading: true, error: null });
	try {
		await updateProductInFirestore(updatedProductObject);
		console.log("Updated product:", updatedProductObject);

		set(state => {
			const updatedProducts = state.products.map(product =>
				product.id === updatedProductObject.id ? { ...product, ...updatedProductObject } : product
			);

			const filtered = updatedProducts.filter(product =>
				product.title.toLowerCase().includes(state.filterTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(state.filterTerm.toLowerCase())
			);
			let sorted = [...filtered];
			//sort according to current sort option
				if (state.sortOption === "price-asc") {
					sorted.sort((a, b) => a.price - b.price);
				} else if (state.sortOption === "price-desc") {
					sorted.sort((a, b) => b.price - a.price);
				} else if (state.sortOption === "letter") {
					sorted.sort((a, b) => a.title.localeCompare(b.title));
				}
				return {
					products: updatedProducts,
					filteredProducts: sorted,
					loading: false,
					error: null,
				};
		});
	} catch (error) {
		console.error("Error updating product:", error);
		set({ loading: false, error: "Failed to update product" });
		throw error;
	}
},

removeProduct: async (productId) => {
	set({ loading: true, error: null });
	try { 
		await removeProductFromFirestore(productId);
		console.log("Removed product with ID:", productId);
		set(state => {
			const updatedProducts = state.products.filter(product => product.id !== productId);
			const filtered = updatedProducts.filter(product =>
				product.title.toLowerCase().includes(state.filterTerm.toLowerCase()) ||
				product.category.toLowerCase().includes(state.filterTerm.toLowerCase())
			);
			//sort according to current sort option
			let sorted = [...filtered];
				if (state.sortOption === "price-asc") {
					sorted.sort((a, b) => a.price - b.price);
				} else if (state.sortOption === "price-desc") {
					sorted.sort((a, b) => b.price - a.price);
				} else if (state.sortOption === "letter") {
					sorted.sort((a, b) => a.title.localeCompare(b.title));
				}
				return {
					products: updatedProducts,
					filteredProducts: sorted,
					loading: false,
					error: null,
				};
		});
	} catch (error) {
		console.error("Error removing product:", error);
		set({ loading: false, error: "Failed to remove product" });
		throw error;
	}
},
	//search state
	applyFilter: (searchTerm) => {
		set((state) => {
			const term = searchTerm.toLowerCase();
			const filtered = state.products.filter((product) =>
				product.title.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
			);
			let sorted = [...filtered];
             if (state.sortOption === "price-asc") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (state.sortOption === "price-desc") {
                sorted.sort((a, b) => b.price - a.price);
            } else if (state.sortOption === "letter") {
                sorted.sort((a, b) => a.title.localeCompare(b.title));
            }
			return { filteredProducts: sorted, filterTerm: term };
		});
	},
	//sort products
	applySort: (sortOption) => {
		set((state) => {
			let sorted = [...state.filteredProducts];
			// Sort by price ascending
			if (sortOption === "price-asc") {
				sorted.sort((a, b) => a.price - b.price);
			} else if (sortOption === "price-desc")
				 {
				sorted.sort((a, b) => b.price - a.price);
			} else if (sortOption === "letter") {
				// Sort alphabetically
				sorted.sort((a, b) => a.title.localeCompare(b.title));
			}
			return { filteredProducts: sorted, sortOption: sortOption };
		});
	},
}));

export default useProductStore;
