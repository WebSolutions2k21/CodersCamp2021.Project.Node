import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

const getProject = async (req: Request, res: Response) => {
  const project = res.locals.project;
  res.status(StatusCodes.OK).send(project);
};

export default getProject;
