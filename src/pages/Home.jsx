import { useEffect } from "react"
import Filter from "../components/Filter"
import StoreProduct from "../components/StoreProduct"
// import { products } from "../data/products"
import useProductStore from "../store/productStore"
import "./Home.css"

const Home = () => {
	const { products, fetchProducts } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, []);
	return(
		<section>
			<h1>Products</h1>
			<Filter />
			<div className="products-container">
			{products.map((item) => (
				<StoreProduct 
				item={item}
				key={item.id}
				/>
			))
			}
			</div>
		</section>
	)
}

export default Home