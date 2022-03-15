import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import userModel from "../../models/user.model";
import validateChangePassword from "./validatePassword";

export default async function changePassword(req: Request, res: Response) {
  const { error } = validateChangePassword(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  }

  let user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  if (req.body.newPassword !== req.body.confirmNewPassword)
    return res.status(StatusCodes.BAD_REQUEST).send("New password and confirm password must be the same.");

  const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!validPassword) return res.status(StatusCodes.BAD_REQUEST).send("Invalid  password.");

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.newPassword, salt);

  user = await userModel.findByIdAndUpdate(req.userInfo._id, { password: newPassword }, { new: true });
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const name = user.firstname;

  res.status(200).send(`Password changed ${name}`);
}
