import Joi from "joi";

export default function validateNewPassword(req: string) {
  const schema = Joi.object({
    newPassword: Joi.string().min(8).max(500).required(),
    confirmNewPassword: Joi.string().min(8).max(500).required(),
  });

  return schema.validate(req);
}
