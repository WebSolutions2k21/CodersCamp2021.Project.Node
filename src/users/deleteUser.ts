import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { projectModel } from "../../models/project.model";
import userModel from "../../models/user.model";
import teamsModel from "../../models/team.model";

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("No user found");

  await projectModel.deleteMany({ userId: req.userInfo._id });

  let userIndex: number | null = null;
  const teams = await teamsModel.find({ usersIds: req.userInfo._id });
  teams.forEach(async (team) => {
    team?.usersIds?.forEach((element, index) => {
      if (element.toString() === req.userInfo._id.toString()) userIndex = index;
    });
    if (userIndex) team?.usersIds?.splice(userIndex, 1);
    await team.save();
  });

  return res.status(StatusCodes.OK).send(`Delete user with id: ${user._id}`);
};

export default deleteUser;
