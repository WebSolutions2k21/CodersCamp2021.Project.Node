import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../models/project.model";

const findProject = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.projectId);
  try {
    const project = await projectModel.findById(req.params.projectId);
    if (!project) throw new Error();

    res.locals.project = project;
    next();
  } catch (ex) {
    res.status(StatusCodes.NOT_FOUND).send("Project not found");
  }
};

export default findProject;
