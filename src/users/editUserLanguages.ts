import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import userModel from "../../models/user.model";
import validateUserLanguages from "./validateUserLanguages";

const editLanguage = async (req: Request, res: Response) => {
  const { error } = validateUserLanguages(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);

  const { user } = res.locals;
  const userProf = await userModel.findByIdAndUpdate(user._id, { ...req.body }, { new: true });

  res
    .status(StatusCodes.OK)
    .send(_.pick(userProf, ["_id", "username", "email", "firstname", "lastname", "isMentor", "programmingLanguage"]));
};

export default editLanguage;
