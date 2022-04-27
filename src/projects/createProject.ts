import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import { validateProject } from "./projectValidator";
import { projectModel } from "../../models/project.model";

const createProject = async (req: Request, res: Response) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const isProjectExist = await projectModel.findOne({ name: req.body.name });
  if (isProjectExist) return res.status(StatusCodes.BAD_REQUEST).send("Project already exists");

  const project = new projectModel({
    name: req.body.name,
    userId: req.body.userId && mongoose.Types.ObjectId(req.body.userId),
    mentorId: req.body.mentorId && mongoose.Types.ObjectId(req.body.mentorId),
    teamId: req.body.teamId && mongoose.Types.ObjectId(req.body.teamId),
    content: req.body.content,
    status: req.body.status,
  });

  await project.save();
  res.status(StatusCodes.OK).send(project);
};

export default createProject;
