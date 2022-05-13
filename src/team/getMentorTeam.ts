import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from "../../models/team.model";
import userModel from "../../models/user.model";

const getMentorTeam = async (req: Request, res: Response) => {
  let user = await userModel.findById(req.userInfo._id);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send("User not found");

  const allTeams = await teamModel.find().select("description status teamName mentorId userIds");

  const mentorTeams: object[] = [];
  allTeams.forEach((team) => {
    if (team.mentorId?.toString() === user?._id.toString()) {
      return mentorTeams.push(team);
    }
  });

  if (mentorTeams === null) {
    res.status(StatusCodes.NOT_FOUND).send();
    return;
  }
  res.status(StatusCodes.OK).send(mentorTeams);
};
export default getMentorTeam;
