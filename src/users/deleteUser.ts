import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";
import userModel from "../../models/user.model";

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("No user found");

  await projectModel.deleteMany({ userId: req.userInfo._id });

  return res.status(StatusCodes.OK).send(`Delete user with id: ${user._id}`);
};

export default deleteUser;
