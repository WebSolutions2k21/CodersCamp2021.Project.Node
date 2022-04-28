import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import opinionModel from "../../models/opinion.model";
import validateOpinion from "./validateOpinion";

const createOpinion = async (req: Request, res: Response) => {
  const { error } = validateOpinion(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  let opinion = await opinionModel.findOne({ userId: req.body.userId });

  if (opinion) {
    return res.status(StatusCodes.BAD_REQUEST).send("Opinion already exists");
  } else {
    opinion = new opinionModel({
      stars: req.body.stars,
      userId: mongoose.Types.ObjectId(req.body.userId),
      mentorId: mongoose.Types.ObjectId(req.body.mentorId),
      content: req.body.content,
    });

    await opinion.save();
    res.send(opinion);
  }
};

export default createOpinion;
