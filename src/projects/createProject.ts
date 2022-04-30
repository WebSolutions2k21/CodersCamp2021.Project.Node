import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { validateProject } from "./projectValidator";
import { projectModel } from "../../models/project.model";
import userModel from "../../models/user.model";
import { IProject } from "../../interfaces/project.interface";
import teamModel from "../../models/team.model";

const createProject = async (req: Request, res: Response) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const user = await userModel.findById(req.body.userId);
  if (req.body.userId && !user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const mentor = await userModel.findById(req.body.mentorId);
  if (req.body.mentorId && (!mentor || !mentor.isMentor))
    return res.status(StatusCodes.NOT_FOUND).send("Mentor not found");

  const team = await teamModel.findById(req.body.teamId);
  if (req.body.teamId && !team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

  if (req.body.userId && req.body.teamId)
    return res.status(StatusCodes.BAD_REQUEST).send("Can't specify if project is individual or it is team project");

  const projectData: IProject = {
    isIndividual: !!req.body.userId,
    ...req.body,
  };
  const project = new projectModel(projectData);

  await project.save();
  res.status(StatusCodes.OK).send(project);
};

export default createProject;
