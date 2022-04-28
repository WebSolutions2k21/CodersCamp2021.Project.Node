import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";
import { validateProjectMembers } from "./projectMembersValidator";

const editProject = async (req: Request, res: Response) => {
  const { error } = validateProjectMembers(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const project = await projectModel.findById(req.params.id);
  if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  const { _id: id } = req.userInfo;
  const { userId, mentorId } = project;
  const userOK = userId?.toString() === id.toString();
  const mentorOK = mentorId?.toString() === id.toString();
  if (!userOK && !mentorOK)
    return res.status(StatusCodes.FORBIDDEN).send(`You are not authorized to perform this operation`);

  const user = await userModel.findById(req.body.userId);
  if (req.body.userId && !user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const mentor = await userModel.findById(req.body.mentorId);
  if (req.body.mentorId && (!mentor || !mentor.isMentor))
    return res.status(StatusCodes.NOT_FOUND).send("Mentor not found");

  const team = await teamModel.findById(req.body.teamId);
  if (req.body.teamId && !team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

  const projectUpdated = await projectModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  return res.status(StatusCodes.OK).send(projectUpdated);
};

export default editProject;
