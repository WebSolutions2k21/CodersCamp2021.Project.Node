import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { projectModel } from "../../models/project.model";
import { validateProject } from "./projectValidator";

const editProject = async (req: Request, res: Response) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let project = await projectModel.findById(req.params.id);
  if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  project = await projectModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });

  return res.status(StatusCodes.OK).send(project);
};

export default editProject;
