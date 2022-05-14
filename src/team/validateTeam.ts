import Joi from "joi";

export default function validate(req: string) {
  const schema = Joi.object({
    teamName: Joi.string().min(3).max(50),
    usersIds: Joi.array().items(Joi.string()),
    mentorId: Joi.string(),
    programmingLanguage: Joi.array().default({
      level: Joi.string().min(2).max(100),
      nameLang: Joi.string().min(2).max(100),
    }),
    status: Joi.boolean(),
    places: Joi.number().min(0).max(10),
    description: Joi.string().min(0).max(1500)
  });
  return schema.validate(req);
}
