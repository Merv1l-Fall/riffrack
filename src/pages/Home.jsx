import { useEffect } from "react";
import Filter from "../components/Filter";
import StoreProduct from "../components/StoreProduct";
import useProductStore from "../store/productStore";
import "./Home.css";

const Home = () => {
	const { filteredProducts, loading } = useProductStore();

	return (
		<section className="home-section">
			<h1>Products</h1>
			<Filter />
			<div className="products-container">
				{loading ? (
					<h2 className="no-products">Loading...</h2>
				) : filteredProducts.length === 0 ? (
					<h2 className="no-products">No products found</h2>
				) : (
					filteredProducts.map((item) => (
						<StoreProduct item={item} key={item.id} />
					))
				)}
			</div>
		</section>
	);
};

export default Home;
