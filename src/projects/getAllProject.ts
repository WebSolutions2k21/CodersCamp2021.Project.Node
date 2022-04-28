import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";

const getAllProject = async (req: Request, res: Response) => {
  const projects = await projectModel.find().select("");
  res.status(StatusCodes.OK).send(projects);
};

export default getAllProject;
