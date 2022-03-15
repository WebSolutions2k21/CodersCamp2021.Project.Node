import express, { Request, Response } from "express";
import teamModel from "../models/team.model";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export default class TeamController {
  public path = "/team";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.post(`${this.path}/create`, this.create);
  }

  async create (req: Request, res: Response){
      let team = await teamModel.findOne({ name: req.body.teamName });
    if (team) {
        return res.status(400).send("Team already exists");
    } else {
        team = new teamModel({
            teamName: req.body.teamName,
        //   userIds: mongoose.Types.ObjectId(req.body.usersIds),
            mentorId: mongoose.Types.ObjectId(req.body.mentorId),
        });
  
        await team.save();
        res.send(team);
    }
  }

  async getAll(req: Request, res: Response) {
    console.log("getAll", req.body);
    const teams = await teamModel.find().select("-_id");
    res.status(StatusCodes.OK).send(teams);
  }

}