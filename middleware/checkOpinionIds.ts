import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import userModel from "../models/user.model";

const checkOpinionIds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (req.body.userId && !user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

    const mentor = await userModel.findById(req.body.mentorId);
    if (req.body.mentorId && (!mentor || !mentor.isMentor))
      return res.status(StatusCodes.NOT_FOUND).send("Mentor not found");

    next();
  } catch (ex) {
    res.status(StatusCodes.BAD_REQUEST).send(`wrong id, it has to be valid object id or null`);
  }
};

export default checkOpinionIds;
