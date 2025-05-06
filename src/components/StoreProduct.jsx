import "./StoreProduct.css"

const StoreProduct = ({item}) => {
	const handleBuy = (id) => {
		console.log(id)
	}
	return(
		<div className="card">
			<div className="card-img-container">
			<img src={item.img} alt={item.title} />
			</div>

			<h2>{item.title}</h2>
			<p>{item.description}</p>
			<p className="category">{item.category}</p>
			<div className="product-bottom-container">
				<p>{item.price} $</p>
				<button className="buy-button" onClick={ (target) => {handleBuy(target.id)}}>Buy</button>
			</div>
		</div>
	)
}

export default StoreProduct