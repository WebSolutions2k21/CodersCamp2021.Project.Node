import Joi from "joi";

export const validateOpinionEdit = (req: string) => {
  const schema = Joi.object({
    content: Joi.string().min(2).max(500),
    stars: Joi.number().greater(0).less(6),
  });

  return schema.validate(req);
};
