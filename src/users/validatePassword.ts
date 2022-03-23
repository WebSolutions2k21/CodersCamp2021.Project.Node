import Joi from "joi";


export default function validateChangePassword(req: string) {
	const schema = Joi.object({
		oldPassword: Joi.string().min(8).max(500).required(),
        newPassword: Joi.string().min(8).max(500).required(),
        confirmNewPassword: Joi.string().min(8).max(500).required(),
	});

	return schema.validate(req);
}
