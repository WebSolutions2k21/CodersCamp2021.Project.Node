import Joi from "joi-oid";

import STATUS from "../../enums/projectsStatus";
import { IProject } from "../../interfaces/project.interface";

export const validateProject = (project: IProject) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    userId: Joi.objectId().allow(null),
    mentorId: Joi.objectId().allow(null),
    teamId: Joi.objectId().allow(null),
    content: Joi.string().max(2048),
    status: Joi.string().valid(STATUS.CLOSED, STATUS.OPEN),
    language: Joi.array().items(Joi.string()),
    description: Joi.string().max(2048),
    isIndividual: Joi.boolean(),
  });

  return schema.validate(project);
};
