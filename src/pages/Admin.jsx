import "./Admin.css";

const Admin = () => {
	return (
		<section className="admin-section">
			<h1>Admin</h1>
			<div className="admin-products-container"></div>
			<div className="admin-form-container">
				<form>
					<div className="admin-input-container">
						<label htmlFor="product-name-input">Product name</label>
						<input
							type="text"
							name="name"
							id="product-name-input"
						/>
					</div>
					<div className="admin-input-container">
						<label htmlFor="product-desc-input">
							Product description
						</label>
						<textarea
							name="desc"
							id="product-desc-input"
						></textarea>
					</div>
					<div className="admin-input-container">
						<label htmlFor="product-category-input">
							Product category
						</label>
						<input
							type="text"
							name="category"
							id="product-category-input"
						/>
					</div>
					<div className="admin-input-container">
						<label htmlFor="product-price-input">
							Product price
						</label>
						<input
							type="number"
							name="price"
							id="product-price-input"
						/>
					</div>
					<div className="admin-input-container">
						<label htmlFor="product-img-input">
							Product image link
						</label>
						<input type="text" name="img" id="product-img-input" />
					</div>
				</form>
			</div>
		</section>
	);
};

export default Admin;
