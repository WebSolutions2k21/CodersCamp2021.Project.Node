import Joi from "joi-oid";

import { IProject } from "../../interfaces/project.interface";

export const validateProjectMembers = (project: IProject) => {
  const schema = Joi.object({
    userId: Joi.objectId().allow(null),
    mentorId: Joi.objectId().allow(null),
    teamId: Joi.objectId().allow(null),
  });

  return schema.validate(project);
};
