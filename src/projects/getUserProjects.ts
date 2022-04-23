import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import projectModel from "../../models/project.model";
import userModel from "../../models/user.model";

const getUserProjects = async (req: Request, res: Response) => {
  let user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  //   if (user === projectModel.findOne("userId"))
  //   console.log(user);

  const userProject = (await projectModel.find().select("content name userId _id")).filter((a) => {
    return a.userId.toString() === user?._id.toString();
  });
  if (userProject === null) {
    res.status(StatusCodes.NOT_FOUND).send();
    return;
  }
  res.status(StatusCodes.OK).send(userProject);
};
export default getUserProjects;
