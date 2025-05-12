import { create } from "zustand";

const useCartStore = create((set, get) => ({
	cart: [],
	addToCart: (product) => {
		set((state) => {
			//increase if the item already exists
			const existingItem = state.cart.find(
				(item) => item.id === product.id
			);
			if (existingItem) {
				return {
					cart: state.cart.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			}
			//add the item to the cart
			return {cart: [...state.cart, { ...product, quantity: 1}]}
		});
	},

	updateQuantity: (id, quantity) => {
		set((state) => ({
			cart: state.cart.map((item) => 
			item.id === id ? {...item, quantity} : item
		),
		}));
	},
	removeCartItem: (id) => {
		set((state) => ({
			cart : state.cart.filter((item) => item.id !== id),
		}));
	},
	getTotalPrice: () => {
		const cart = get().cart;
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	  },
}));


export default useCartStore