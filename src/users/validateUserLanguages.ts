import Joi from "joi";

import User from "../../interfaces/user.interface";
import LANG_LEVEL from "../../enums/userLanguages";

export default function validateUserLanguages(user: User) {
  const schema = Joi.object({
    programmingLanguage: Joi.array().default({
      nameLang: Joi.string().max(100),
      level: Joi.string().valid(LANG_LEVEL.JUNIOR, LANG_LEVEL.MID, LANG_LEVEL.SENIOR),
    }),
  });

  return schema.validate(user);
}
