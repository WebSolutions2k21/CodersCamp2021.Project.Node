import Joi from "joi";

export default function validateOpinion(req: string) {
  const schema = Joi.object({
    content: Joi.string().min(2).max(500).required(),
    userId: Joi.string().required(),
    mentorId: Joi.string().required(),
    stars: Joi.number().greater(1).less(6)
  });

  return schema.validate(req);
}