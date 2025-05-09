import { useState } from "react";
import addProductSchema from "../validation/addItemValidation";
import "./AdminProduct.css"

const AdminProduct = ({ item, onEdit, onRemove }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [shouldRenderEditForm, setShouldRenderEditForm] = useState(false);
	const [formData, setFormData] = useState(item);
	const [errors, setErrors] = useState({});
	const [confirmRemove, setConfirmRemove] = useState(false);
	const [removeTimeout, setRemoveTimeout] = useState(null);

	const handleEditClick = () => {
		setIsEditing(true);
		setShouldRenderEditForm(true);
		setConfirmRemove(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setFormData(item);
		setErrors({});
		setTimeout(() => {
			setShouldRenderEditForm(false);
		}, 300);
	};

	const handleSave = () => {
		//Joi doesn't expect id so id is excluded from verification
		const { id, ...dataToValidate } = formData;

		// Validate
		const { error } = addProductSchema.validate(dataToValidate, {
			abortEarly: false,
		});
		if (error) {
			console.log(error);
			const validationErrors = {};
			error.details.forEach((detail) => {
				validationErrors[detail.path[0]] = detail.message;
			});
			setErrors(validationErrors);
			return;
		}

		onEdit(formData);
		setErrors({});
		setIsEditing(false);
		setTimeout(() => {
			setShouldRenderEditForm(false);
		}, 300);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleRemoveClick = () => {
		if (confirmRemove) {
			onRemove(item.id);
			clearTimeout(removeTimeout);
		} else {
			setConfirmRemove(true);
			const timeout = setTimeout(() => {
				setConfirmRemove(false);
			}, 3000);
			setRemoveTimeout(timeout);
		}
	};

	return (
		<div className={`admin-item ${isEditing ? "editing" : ""}`}>
			{shouldRenderEditForm ? (
				<div className={`edit-form ${isEditing ? "open" : "close"}`}>
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
					<div className='error-message'>
					{errors.title && <p className="error">{errors.title}</p>}
					</div>
					
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
					<div className='error-message'>
					{errors.description && <p className="error">{errors.description}</p>}
					</div>
					
					<label htmlFor="category">Category</label>
					<textarea
						id="category"
						name="category"
						value={formData.category}
						onChange={handleChange}
					/>
					<div className='error-message'>
					{errors.category && <p className="error">{errors.category}</p>}
					</div>
					
					<label htmlFor="price">Price</label>
					<input
						id="price"
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
					/>
					<div className='error-message'>
					{errors.price && <p className="error">{errors.price}</p>}
					</div>
					
					<label htmlFor="img">Image link</label>
					<input
						id="img"
						type="text"
						name="img"
						value={formData.img}
						onChange={handleChange}
					/>
					<div className='error-message'>
					{errors.img && <p>{errors.img}</p>}
					</div>
					
					<div className="admin-actions">
						<button className="save-btn" onClick={handleSave}>
							Save
						</button>
						<button className="cancel-btn" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<>
				<div className="admin-item-img-container">
				<img className="admin-item-img" src={item.img} alt={item.title} />

				</div>
					<div className="admin-item-info">
					<p>{item.title}</p>
					<p>{item.price} $</p>
					<p>{item.category}</p>
					</div>
					<div className="admin-actions">
						<button onClick={handleEditClick}>Edit</button>
						<button
							className={confirmRemove ? "confirm-remove" : ""}
							onClick={handleRemoveClick}
						>
							{confirmRemove ? "Are you sure?" : "Remove"}
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminProduct;