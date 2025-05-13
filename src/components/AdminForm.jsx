import { useState } from "react"
import addProductSchema from "../validation/addItemValidation";
import useProductStore from "../store/productStore";
import "./AdminForm.css"


const AdminForm = () => {
	const [ isItemAdded, setIsItemAdded] = useState(false);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState(false);


	const [formData, setFormData] = useState({
		title: '',
		description: '',
		category: '',
		price: '',
		img: '',
	});

	const addProduct = useProductStore((state) => state.addProduct);
	const isLoading = useProductStore((state) => state.loading);
	const storeError = useProductStore((state) => state.error);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFocus = () => {
        setTouched(true);
    };

	const validateForm = () => {
		const { error } = addProductSchema.validate(formData, { abortEarly: false });
		if (!error) return null;

		const validationErrors = {};
		error.details.forEach((detail) => {
			validationErrors[detail.path[0]] = detail.message;
		});
		return validationErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Validate the form before submitting
		const validationErrors = validateForm();
		if (validationErrors) {
			setErrors(validationErrors);
			console.log("failed to add item", validationErrors)
			return;
		}

		setErrors({});
		try {
			await addProduct(formData);
			// console.log("Item added successfully");

			setFormData({
			title: '',
			description: '',
			category: '',
			price: '',
			img: '',
		});
		setErrors({});
		setIsItemAdded(true)
		setTouched(false)
	} catch (error) {
		console.error("Failed to add item:", error);
	}
}

	const handleCancel = () => {
		// console.log('Cancelled adding new item');
		setFormData({
			title: '',
			description: '',
			category: '',
			price: '',
			img: '',
		})
		setErrors({});
		setTouched(false)
	};

	return (
		<section className="add-item">
			
			{isItemAdded ? (
				<div className='show-confirm'>
					<h2>Item added!</h2>
					<button onClick={() => setIsItemAdded(false)} className='add-more-button'>Add another item</button>
				</div>
			) : (
			<div className='show-form'>

			<h2>New item</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>
					Title
					<input
						id='title'
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						onFocus={handleFocus}
					/>
					<div className='error-message'>
					{errors.title && <p className="error">{errors.title}</p>}
					</div>
				</label>
				<label htmlFor='description'>
					Description
					<textarea
						id='description'
						name="description"
						value={formData.description}
						onChange={handleChange}
						onFocus={handleFocus}
					/>
					<div className='error-message'>
					{errors.description && <p className="error">{errors.description}</p>}
					</div>
				</label>
				<label htmlFor='category'>
					Category
					<input
						type="text"
						id='category'
						name="category"
						value={formData.category}
						onChange={handleChange}
						onFocus={handleFocus}
					/>
					<div className='error-message'>
					{errors.category && <p className="error">{errors.category}</p>}
					</div>
				</label>
				<label htmlFor='price'>
					Price
					<input
						id='price'
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						onFocus={handleFocus}
					/>
					<div className='error-message'>
					{errors.price && <p className="error">{errors.price}</p>}
					</div>
				</label>
				<label htmlFor='img'>
					Image link
					<input
						id='img'
						type="text"
						name="img"
						value={formData.img}
						onChange={handleChange}
						onFocus={handleFocus}
					/>
					<div className='error-message'>
					{errors.img && <p>{errors.img}</p>}
					</div>
				</label>
				<div className="form-actions">
					<button className='cancel-button' type="button" onClick={handleCancel} disabled={!touched}>
						Clear form
					</button>
					<button
					 className='submit-button'
					  type="submit"
					   disabled={!touched}>
						{isLoading ? "Loading..." : "Add item"}
					   </button>
				</div>
			</form>	
			</div>
			)}
		</section>
	);
};

export default AdminForm