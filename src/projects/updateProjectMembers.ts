import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";
import { validateProjectMembers } from "./projectMembersValidator";

const editProject = async (req: Request, res: Response) => {
  const { error } = validateProjectMembers(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const projectUpdated = await projectModel.findByIdAndUpdate(req.params.projectId, { ...req.body }, { new: true });

  return res.status(StatusCodes.OK).send(projectUpdated);
};

export default editProject;
