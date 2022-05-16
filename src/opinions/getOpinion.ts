import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

const getOpinion = async (req: Request, res: Response) => {
  const opinion = res.locals.opinion;
  res.status(StatusCodes.OK).send(opinion);
};

export default getOpinion;
