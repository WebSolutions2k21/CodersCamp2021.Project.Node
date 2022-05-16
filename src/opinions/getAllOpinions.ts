import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { opinionModel } from "../../models/opinion.model";

const getAllOpinions = async (req: Request, res: Response) => {
  const opinions = await opinionModel.find();
  res.status(StatusCodes.OK).send(opinions);
};

export default getAllOpinions;
