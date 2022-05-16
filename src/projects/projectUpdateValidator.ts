import Joi from "joi-oid";

import { PROJECT_STATUS } from "../../enums/projectsStatus";
import { IProject } from "../../interfaces/project.interface";

export const validateProjectUpdate = (project: IProject) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    content: Joi.string().max(2048),
    status: Joi.string().valid(PROJECT_STATUS.CLOSED, PROJECT_STATUS.OPEN),
    description: Joi.string().max(2048),
    language: Joi.array().items(Joi.string()),
  });

  return schema.validate(project);
};
