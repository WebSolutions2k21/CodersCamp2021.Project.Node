import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const getAllMentors = async (req: Request, res: Response) => {
  const users = await userModel.find().select("-passsword");

  const getMentors = users.filter((user) => user.isMentor === true);
  res.status(StatusCodes.OK).send(getMentors);
};

export default getAllMentors;
