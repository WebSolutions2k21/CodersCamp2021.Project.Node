import Joi from "joi-oid";

import { projectStatuses } from "../../constants/constatns";
import { IProject } from "../../interfaces/project.interface";

export const validateProject = (project: IProject) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    userId: Joi.objectId(),
    mentorId: Joi.objectId(),
    teamId: Joi.objectId(),
    content: Joi.string(),
    status: Joi.string().valid(...projectStatuses),
    language: Joi.array().items(Joi.string()),
    description: Joi.string(),
    isIndividual: Joi.boolean(),
  });

  return schema.validate(project);
};
