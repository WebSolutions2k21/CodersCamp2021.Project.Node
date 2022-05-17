import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { opinionModel } from "../models/opinion.model";

const findOpinion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const opinion = await opinionModel.findById(req.params.opinionId);
    if (!opinion) throw new Error();

    res.locals.opinion = opinion;
    next();
  } catch (ex) {
    res.status(StatusCodes.NOT_FOUND).send("Opinion not found");
  }
};

export default findOpinion;
