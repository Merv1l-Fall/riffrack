import { create } from "zustand";

const useAdminStore = create((set) => ({
	isLoggedIn: false,
	toggleLogIn: () => {
		set((state) => ({isLoggedIn: !state.isLoggedIn}))
	},
}));

export default useAdminStore