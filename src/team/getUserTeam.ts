import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

const getUserTeam = async (req: Request, res: Response) => {
  let user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const allTeams = await teamModel.find().select("description status teamName usersIds");

  const userTeams: object[] = [];

  allTeams.forEach((team) => {
    if (team.usersIds?.toString() === user?._id.toString()) {
      return userTeams.push(team);
    }
  });

  if (userTeams === null) {
    res.status(StatusCodes.NOT_FOUND).send();
    return;
  }
  res.status(StatusCodes.OK).send(userTeams);
};
export default getUserTeam;
