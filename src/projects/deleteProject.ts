import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";

const deleteProject = async (req: Request, res: Response) => {
  await projectModel.findByIdAndDelete(req.params.projectId);
  return res.status(StatusCodes.OK).send(`Project with id: ${req.params.projectId} has been deleted`);
};

export default deleteProject;
