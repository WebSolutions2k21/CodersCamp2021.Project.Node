import express, { Request, Response } from "express";
import teamModel from "../models/team.model";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";


// import auth from "../middleware/auth";

// import addMentor from "../src/team/addMentor";
// import deleteMentor from "../src/team/deleteMentor";
// import createTeamProject from "../src/team/createTeamProject"

export default class TeamController {
  public path = "/team";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // this.router.get(this.path, this.getAll);
    // this.router.post(`${this.path}/addmentor`, this.addMentor);
    // this.router.delete(`${this.path}/deletementor`, this.deleteMentor);
    this.router.post(`${this.path}/create`, this.create);
  }

    async create (req: Request, res: Response){
    let team = await teamModel.findOne({ name: req.body.teamname });
    if (team) {
        return res.status(400).send("Team already exists");
    } else {
        team = new teamModel({
          name: req.body.teamname,
          userId: mongoose.Types.ObjectId(req.body.usersIds),
          mentorId: mongoose.Types.ObjectId(req.body.mentorId),
          teamId: mongoose.Types.ObjectId(req.body.teamId),
          content: req.body.content,
          status: req.body.content,
        });
  
        await team.save();
        res.send(team);
    }
}
//   addMentor(req: Request, res: Response) {
//     addMentor(req, res);
//   }

//   deleteMentor(req: Request, res: Response) {
//     deleteMentor(req, res);
//   }

//   createTeamProject(req: Request, res: Response) {
//     createTeamProject(req, res);
//   }

}