import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import projectModel from "../../models/project.model";

const deleteProject = async (req: Request, res: Response) => {
  const project = await projectModel.findByIdAndDelete(req.params.id);
  if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

  return res.status(StatusCodes.OK).send(`Project with id: ${req.params.id} has been deleted`);
};

export default deleteProject;
