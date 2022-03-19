import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import projectModel from "../../models/project.model";

const getProject = async (req: Request, res: Response) => {
  const project = await projectModel.findById(req.params.id);
  if (project === null) {
    res.status(404).send();
    return;
  }
  res.status(StatusCodes.OK).send(project);
};
export default getProject;
