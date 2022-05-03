import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { validateProject } from "./projectValidator";
import { projectModel } from "../../models/project.model";
import { IProject } from "../../interfaces/project.interface";

const createProject = async (req: Request, res: Response) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

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
