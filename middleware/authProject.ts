import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import { IProject } from "../interfaces/project.interface";

const authProject = (req: Request, res: Response, next: NextFunction) => {
  const { _id: id } = req.userInfo;
  const { userId, mentorId } = res.locals.project as IProject;

  const userOK = userId?.toString() === id.toString();
  const mentorOK = mentorId?.toString() === id.toString();
  if (!userOK && !mentorOK)
    return res.status(StatusCodes.FORBIDDEN).send(`You are not authorized to perform this operation`);

  next();
};

export default authProject;
