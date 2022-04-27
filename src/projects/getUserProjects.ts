import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { projectModel } from "../../models/project.model";
import userModel from "../../models/user.model";

const getUserProjects = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const userProjects = await projectModel.find(
    { $or: [{ userId: user._id }, { mentorId: user._id }] },
    (err) => err && res.status(StatusCodes.BAD_REQUEST).send(err),
  );

  res.status(StatusCodes.OK).send(userProjects);
};

export default getUserProjects;
