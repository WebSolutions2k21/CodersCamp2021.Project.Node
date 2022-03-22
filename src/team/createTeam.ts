import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import teamModel from '../../models/team.model'
import mongoose from "mongoose";

export default async function createTeam(req: Request, res: Response) {
    let team = await teamModel.findOne({ teamName: req.body.teamName });
    if (team) {
      return res.status(StatusCodes.BAD_REQUEST).send("Team already exists");
    } else {
      team = new teamModel({
        teamName: req.body.teamName,
        usersIds: [{
            id: req.body.usersIds.id,
        }],
        mentorId: mongoose.Types.ObjectId(req.body.mentorId),
        programmingLanguage: [{
            nameLang: req.body.programmingLanguage.nameLang,
            level: req.body.programmingLanguage.level
        }],
        status: req.body.status
      });

      await team.save();
      res.send(team);
    }
}