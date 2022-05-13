import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model";

const getOnlyUsers = async (req: Request, res: Response) => {
  const users = await userModel.find().select("-passsword");

  const getUsers = users.filter((user) => user.isMentor === false);
  const getVerifiedUsers = getUsers.filter(user => user.isVerified === true)

  res.status(StatusCodes.OK).send(getVerifiedUsers );
};

export default getOnlyUsers;
