import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";

import opinionModel from "../../models/opinion.model";
import validateOpinion from "./validateOpinion";

 const createOpinion = async (req: Request, res: Response) => {
    console.log("create", req.body);

    let opinion = await opinionModel.findOne({ name: req.body.name });

    opinion = new opinionModel({
      name: req.body.name,
      userId: mongoose.Types.ObjectId(req.body.userId),
      mentorId: mongoose.Types.ObjectId(req.body.mentorId),
      content: req.body.content,
    });

    await opinion.save();
    res.status(200).send("ok");
  }

  export default createOpinion;