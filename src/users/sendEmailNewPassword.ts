import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import emailNewPassword from "../utils/emailNewPassword";
import userModel from "../../models/user.model";
import validateEmail from "./validateEmail";

const sendEmailNewPassword = async (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const email = req.body.email;
  const user = await userModel.findOne({ email: email }).select("id name email");
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const token = user.generateAuthToken();
  const url = `http://${process.env.URL}/set-password/${token}`;
  const message = await emailNewPassword(req.body.email, url);

  res.status(StatusCodes.OK).send(message);
};

export default sendEmailNewPassword;
