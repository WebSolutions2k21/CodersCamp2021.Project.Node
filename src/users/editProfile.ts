import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";
import validateEditProfile from "./validateEditProfile";

const editProfile = async (req: Request, res: Response) => {
  const { error } = validateEditProfile(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
  }
  const user = await userModel.findById(req.params.id);
  if (!user) return res.status(StatusCodes.BAD_REQUEST).send("User not found");

  let userEmail = user.email;
  let isVerifiedValue = user.isVerified;

  if (isVerifiedValue == true && userEmail != req.body.email) {
    return res.status(StatusCodes.LOCKED).send("That email is verified and you couldn't change ");
  }

  const userProf = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true },
  );
  res
    .status(StatusCodes.OK)
    .send(_.pick(userProf, ["_id", "username", "email", "lastname", "firstname", "programmingLanguage"]));
};

export default editProfile;
