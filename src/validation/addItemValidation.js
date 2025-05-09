import Joi from 'joi';

const addProductSchema = Joi.object({
	title: Joi.string().required().messages({
		'string.empty': 'You need to give the product a title',
	}),
	description: Joi.string().required().max(160).messages({
		'string.empty': 'A description is reqired',
		'string.max' : "Description can't be longer than 160 charachters"
	}),
	category: Joi.string().required().messages({
		'string.empty': 'A category is required',
	}),
	price: Joi.number().greater(0).messages({
		'number.base': 'Price must be a number',
		'number.greater': 'The price cant be less then 1',
		'any.reqired': 'A price is required',
	}),
	img: Joi.string()
    .pattern(/^https?:\/\/.+/i)
    .pattern(/\.(jpeg|jpg|gif|png|webp|svg)$/i)
    .required()
    .messages({
        'string.empty': 'An image link is rquired',
        'string.pattern.base': 'The link has to start with http eller https and lead to an image file(jpg, png, gif, etc).',
    }),
});

export default addProductSchema;