import Joi from "joi";
import User from "../../interfaces/user.interface";

export default function validateEditProfile(user: User) {
  const schema = Joi.object({
    isMentor: Joi.boolean(),
    username: Joi.string().min(2).max(50).required(),
    firstname: Joi.string().max(100),
    lastname: Joi.string().max(100),
    email: Joi.string().min(5).max(250).email().required(),
    programmingLanguage: Joi.array().default({
      level: Joi.string().max(100),
      nameLang: Joi.string().max(100),
    }),
  });

  return schema.validate(user);
}
