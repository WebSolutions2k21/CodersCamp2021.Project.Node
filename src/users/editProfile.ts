import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";
import validateEditProfile from "./validateEditProfile";

const editProfile = async (req: Request, res: Response) => {
  const { error } = validateEditProfile(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const { user } = res.locals;
  const { email: userEmail, isVerified } = user;

  if (isVerified && userEmail !== req.body.email)
    return res.status(StatusCodes.LOCKED).send("That email is verified and you couldn't change ");

  const userProf = await userModel.findByIdAndUpdate(user._id, { ...req.body }, { new: true });

  res
    .status(StatusCodes.OK)
    .send(_.pick(userProf, ["_id", "username", "email", "firstname", "lastname", "isMentor", "programmingLanguage"]));
};

export default editProfile;
