import { useEffect } from "react";
import { 
	updateProduct as updateProductInFirestore,
	removeProduct as removeProductFromFirestore 
} from "../data/crud";

import AdminProduct from "../components/AdminProduct";
import useProductStore from "../store/productStore";
import Filter from "../components/Filter";
import AdminForm from "../components/AdminForm";
import "./Admin.css";
import useAdminStore from "../store/adminStore";
import { Link, useNavigate } from "react-router";


const Admin = () => {
	const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
	const navigate = useNavigate();
	const {
		filteredProducts,
		fetchProducts,
		updateProduct,
		removeProduct,
		isLoading,
	} = useProductStore();

	useEffect(() => {
			fetchProducts();
		}, [fetchProducts]);

	const handleEditProduct = async (updatedProductObject) => {
		try {
			await updateProductInFirestore(updatedProductObject);
			updateProduct(updatedProductObject);
		} catch (error) {
			console.error("Error updating product:", error);
		}
	};

	const handleRemoveProduct = async (productId) => {
		try {
			await removeProductFromFirestore(productId);
			removeProduct(productId);
		} catch (error) {
			console.error("Error removing product:", error);
		}
	};

	const handleLogOut = () => {
		useAdminStore.setState({ isLoggedIn: false });
		navigate("/login");
	}

	return (
		isLoggedIn ? (
			<section className="admin-section">
				<div className="admin-items-container">
					<h2>Edit or remove items</h2>
					<Filter />
					{filteredProducts.length === 0 ? (
						<h2 className="no-products">{isLoading ? ("Loading....") : ("No products found")}</h2>
					) : (
						filteredProducts.map((item) => (
							<AdminProduct
								item={item}
								key={item.id}
								onEdit={handleEditProduct}
								onRemove={handleRemoveProduct}
							/>
						))
					)}
				</div>
				<div className="admin-form-container">
					<AdminForm />
					<div className="logout-container">
					<button className="logout-btn"
					onClick={handleLogOut}>Logout</button>
					</div>
				</div>
			</section>
		) : (
			<section>
				<div className="not-logged-in-container">
					<h2 className="not-logged-in">Please log in to access the admin panel</h2>
					<Link className="back-btn" to="/login">Back to Log in page </Link>
					
				</div>
			</section> 
		)
	);
};

export default Admin;
