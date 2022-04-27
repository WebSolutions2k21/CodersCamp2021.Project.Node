import Joi from "joi";
import { IProject } from "../../interfaces/project.interface";

export const validateProject = (project: IProject) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(300),
    userId: Joi.string().min(24).max(24),
    mentorId: Joi.optional(),
    teamId: Joi.optional(),
    content: Joi.string().min(2).max(300),
    status: Joi.boolean(),
  });

  console.log("test: ", schema.validate(project));

  return schema.validate(project);
};

// const schema = joi.object().keys({
//   query: joi.object().keys({
//     // allow only apple and banana
//     id: joi.string().valid('apple','banana').required(),
//   }).required(),
// })
