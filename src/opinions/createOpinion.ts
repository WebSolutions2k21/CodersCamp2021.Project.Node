import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { IOpinion } from "../../interfaces/opinion.interface";
import { opinionModel } from "../../models/opinion.model";
import { validateOpinion } from "./validateOpinion";

const createOpinion = async (req: Request, res: Response) => {
  const { error } = validateOpinion(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
//TODO check why id does not work
  // const opinion = await opinionModel.findOne({ userId: req.userInfo._id });
  // if (opinion) return res.status(StatusCodes.BAD_REQUEST).send("Opinion already exists");

  const opinionData: IOpinion = { ...req.body };
  const newOpinion = new opinionModel(opinionData);
  await newOpinion.save();

  res.send(newOpinion);
};

export default createOpinion;
