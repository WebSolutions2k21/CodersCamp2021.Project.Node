import Joi from "joi-oid";

import { IProject } from "../../interfaces/project.interface";

export const validateProjectMembers = (project: IProject) => {
  const schema = Joi.object({
    userId: Joi.objectId(),
    mentorId: Joi.objectId(),
    teamId: Joi.objectId(),
  });

  return schema.validate(project);
};
