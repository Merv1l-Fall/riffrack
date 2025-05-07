import useCartStore from "../store/cartStore";
import "./StoreProduct.css";

const StoreProduct = ({ item }) => {
	const addToCart = useCartStore((state) => state.addToCart);

	const handleBuy = () => {
		addToCart(item);
		console.log("added to cart");
	};
	return (
		<div className="card">
			<div className="card-img-container">
				<img src={item.img} alt={item.title} />
			</div>

			<h2>{item.title}</h2>
			<p>{item.description}</p>
			<p className="category">{item.category}</p>
			<div className="product-bottom-container">
				<p>{item.price} $</p>
				<button
					className="buy-button"
					onClick={() => handleBuy()}
				>
					Buy
				</button>
			</div>
		</div>
	);
};

export default StoreProduct;
