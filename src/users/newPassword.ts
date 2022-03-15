import { Request, Response } from "express";
import bcrypt from "bcrypt";

import userModel from "../../models/user.model";
import validateNewPassword from "./validateNewPassword";

export default async function newPassword(req: Request, res: Response) {
  const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (req.body.newPassword !== req.body.confirmNewPassword)
    return res.status(400).send("New password and confirm password must be the same.");

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.newPassword, salt);

  const user = await userModel.findByIdAndUpdate(req.userInfo._id, { password: newPassword }, { new: true });
  if (!user) return res.status(404).send("User not found");

  const name = user.firstname;

  res.status(200).send(`Password changed ${name}`);
}
