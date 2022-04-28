import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import opinionModel from "../../models/opinion.model";

const getOpinion = async (req: Request, res: Response) => {
  const opinion = await opinionModel.findById(req.params.id);
  if (!opinion) {
    res.status(StatusCodes.NOT_FOUND).send("Opinion not found");
    return;
  }

  res.status(StatusCodes.OK).send(opinion);
};

export default getOpinion;
