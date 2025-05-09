import { useEffect } from "react";
import AdminProduct from "../components/AdminProduct";
import useProductStore from "../store/productStore";
import Filter from "../components/Filter";
import AdminForm from "../components/AdminForm";
import "./Admin.css";


const Admin = () => {
	const { filteredProducts, fetchProducts } = useProductStore();

	useEffect(() => {
			fetchProducts();
		}, [fetchProducts]);

	return (
		<section className="admin-section">
			<div className="admin-items-container">
			<h1>Admin</h1>
				<Filter />
			{filteredProducts.length === 0 ? ( <h2 className="no-products">No products found</h2>) : (
				filteredProducts.map((item) => (
					<AdminProduct 
					item={item}
					key={item.id}
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
