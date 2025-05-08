const AdminProduct = ({ item }) => {

	return (
		<div className="admin-card">
			<div className="admin-card-img-container">
				<img src={item.img} alt={item.title} />
			</div>

			<h2>{item.title}</h2>
			<p>{item.description}</p>
			<p className="admin-category">{item.category}</p>
			<div className="admin-product-bottom-container">
				<p>{item.price} $</p>
				<div className="admin-item-buttons">
					<button>Remove</button>
					<button>Edit</button>
				</div>
			</div>
		</div>
	);
};

export default AdminProduct;
