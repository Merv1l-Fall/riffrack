import CartItem from "../components/CartItem"
import useCartStore from "../store/cartStore"
import "./Cart.css"

const Cart = () => {
	const {cart} = useCartStore();
	const totalPrice = useCartStore((state) =>
		state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
	);

	return (
		<section className="cart-section">
			<h1>Cart</h1>
			<div className="cart-container">
			<div className="cart-items">
				{cart.length === 0 ? (
					<h2 className="cart-empty">Your cart is empty</h2>
				) : (
					
					cart.map((item) => (
						<CartItem
							item={item}
							key={item.id}
						/>
					))
				)}
			</div>
			<div className="order-summary">
				<h2>Order Summary</h2>
				<div>
				<div className="summary-item">
					<p className="text">Subtotal</p>
					<p className="number">{totalPrice} $</p>
				</div>
				<div className="summary-item">
					<p className="text">Handling</p>
					<p className="number">{totalPrice === 0 ? (0) : (50)} $</p>
				</div>
				<div className="summary-item">
					<p className="text">Total</p>
					<p className="number">{cart.length === 0 ? (0) : (totalPrice + 50)} $</p>
				</div>
				</div>
				<button className="checkout-button">Checkout (?)</button>
			</div>
			</div>
		</section>
	)
}

export default Cart