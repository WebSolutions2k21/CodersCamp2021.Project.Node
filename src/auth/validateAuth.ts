import Joi from 'joi'

export const loginValidation = (req: string) => {
	const schema = Joi.object({
		email: Joi.string().min(5).max(250).required().email(),
		password: Joi.string().min(8).max(500).required(),
	});

	return schema.validate(req);
}