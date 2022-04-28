import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";
import { validateProjectUpdate } from "./projectUpdateValidator";

const editProject = async (req: Request, res: Response) => {
  const { error } = validateProjectUpdate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const project = await projectModel.findById(req.params.id);
  if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  const { _id: id } = req.userInfo;
  const { userId, mentorId } = project;
  const userOK = userId?.toString() === id.toString();
  const mentorOK = mentorId?.toString() === id.toString();
  if (!userOK && !mentorOK)
    return res.status(StatusCodes.FORBIDDEN).send(`You are not authorized to perform this operation`);

  const projectUpdated = await projectModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  return res.status(StatusCodes.OK).send(projectUpdated);
};

export default editProject;
