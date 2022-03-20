import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";

import opinionModel from "../../models/opinion.model";
import validateOpinion from "./validateOpinion";

 const createOpinion = async (req: Request, res: Response) => {
   console.log("create", req.body);

   //dodaj obsługę błędów, co jeśli poda się złe parametry w req.body? co jeżeli przy tworzeniu nowej opinii poda się nazwę już istniejącej?

   let opinion = await opinionModel.findOne({ id: req.body.id });

   opinion = new opinionModel({
     stars: req.body.stars,
     userId: mongoose.Types.ObjectId(req.body.userId),
     mentorId: mongoose.Types.ObjectId(req.body.mentorId),
     content: req.body.content,
   });

   await opinion.save();
   res.status(200).send("ok");
 }

  export default createOpinion;