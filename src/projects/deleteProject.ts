import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";
import userModel from "../../models/user.model";

const deleteProject = async (req: Request, res: Response) => {
  const project = await projectModel.findById(req.params.id);
  if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  const { _id: id } = req.userInfo;
  const { userId, mentorId } = project;
  const userOK = userId?.toString() === id.toString();
  const mentorOK = mentorId?.toString() === id.toString();
  if (!userOK && !mentorOK)
    return res.status(StatusCodes.FORBIDDEN).send(`You are not authorized to perform this operation`);

  await projectModel.findByIdAndDelete(req.params.id);
  return res.status(StatusCodes.OK).send(`Project with id: ${req.params.id} has been deleted`);
};

export default deleteProject;
