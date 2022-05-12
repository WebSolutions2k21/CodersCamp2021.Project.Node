import Joi from "joi";

import User from "../../interfaces/user.interface";

export default function validateEditProfile(user: User) {
  const schema = Joi.object({
    isMentor: Joi.boolean(),
    firstname: Joi.string().max(100),
    lastname: Joi.string().max(100),
  });

  return schema.validate(user);
}
