import Joi from "joi-oid";

import { projectStatuses } from "../../constants/constatns";
import { IProject } from "../../interfaces/project.interface";

export const validateProjectUpdate = (project: IProject) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    content: Joi.string(),
    status: Joi.string().valid(...projectStatuses),
    description: Joi.string(),
    language: Joi.array().items(Joi.string()),
  });

  return schema.validate(project);
};
