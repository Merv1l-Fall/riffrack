import { useEffect } from "react";
import { 
	updateProduct as updateProductInFirestore,
	removeProduct as removeProductFromFirestore 
} 
from "../data/crud";

import AdminProduct from "../components/AdminProduct";
import useProductStore from "../store/productStore";
import Filter from "../components/Filter";
import AdminForm from "../components/AdminForm";
import "./Admin.css";


const Admin = () => {
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

	return (
		<section className="admin-section">
			<div className="admin-items-container">
			<h2>Edit or remove items</h2>
				<Filter />
			{filteredProducts.length === 0 ? ( <h2 className="no-products">{isLoading ? ("Loading...."): ("No products found")}</h2>) : (
				filteredProducts.map((item) => (
					<AdminProduct 
					item={item}
					key={item.id}
					onEdit={handleEditProduct}
					onRemove={handleRemoveProduct}
					/>
				))

			)
			}
			</div>
			<div className="admin-form-container">
				<AdminForm />
			</div>
		</section>
	);
};

export default Admin;
