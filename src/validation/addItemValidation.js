import Joi from 'joi';

const addProductSchema = Joi.object({
	title: Joi.string().required().messages({
		'string.empty': 'You need to give the product a title',
	}),
	description: Joi.string().required().max(160).messages({
		'string.empty': 'A description is reqired',
		'string.max' : "Description can't be longer than 160 charachters"
	}),
	category: Joi.string().max(20).pattern(/^(?:[A-ZÅÄÖ][a-zåäö]*\s?)*$/).required().messages({
		'string.empty': 'A category is required',
		'string.max': "Category can't be more than 20 characters",
		'string.pattern.base': 'Each word must start with an uppercase letter',
	}),
	price: Joi.number().greater(0).messages({
		'number.base': 'Price must be a number',
		'number.greater': "The price can't be less then 1",
		'any.reqired': 'A price is required',
	}),
	img: Joi.string()
    .pattern(/^https?:\/\/.+/i)
    .pattern(/\.(jpeg|jpg|gif|png|webp|svg)$/i)
    .required()
    .messages({
        'string.empty': 'An image link is required',
        'string.pattern.base': 'The link has to start with http eller https and lead to an image file(jpg, png, gif, etc).',
    }),
});

export default addProductSchema;