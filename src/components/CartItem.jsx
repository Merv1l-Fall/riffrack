import { useState } from "react"
import useCartStore from "../store/cartStore"
import "./CartItem.css"

const CartItem = ({item}) => {
	const {updateQuantity, removeCartItem} = useCartStore();

	const handleQuantityChange = (id, quantity) => {
		if(quantity >= 1) {
			updateQuantity(id, quantity);
		} else {
			removeCartItem(id);
		}
	};

	return(
		<div className="cart-card">
			<div className="cart-image-container">
			<img src={item.img} alt={item.title} />
			</div>
			<div className="cart-item-text-container">
				<p className="item-title">{item.title}</p>
				<div className="cart-item-bottom">
				<div className="cart-item-buttons">
					<button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity -1)}>-</button>
					<p>{item.quantity}</p>
					<button className="quantity-button" onClick={() => handleQuantityChange(item.id, item.quantity +1)}>+</button>
				</div>
				<p>{item.price * item.quantity} $</p>
				</div>
			</div>
		</div>
	)
}

export default CartItem