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
    this.router.get(`${this.path}/:id`, this.get);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  async getAll(req: Request, res: Response) {
    console.log("getAll", req.body);
    const teams = await teamModel.find().select("-_id");
    res.status(StatusCodes.OK).send(teams);
  }

  async create(req: Request, res: Response) {
    let team = await teamModel.findOne({ teamName: req.body.teamName });
    if (team) {
      return res.status(400).send("Team already exists");
    } else {
      team = new teamModel({
        teamName: req.body.teamName,
        usersIds: req.body.usersIds,
        mentorId: new Array(req.body.mentorId),
        programmingLanguage: mongoose.Types.ObjectId(req.body.programmingLanguage),
        status: req.body.status
      });

      await team.save();
      res.send(team);
    }
  }

  async get(req: Request, res: Response) {
    const team = await teamModel.findById(req.params.id);
    if (team === null) {
      res.status(404).send();
      return;
    }

    res.status(StatusCodes.OK).send(team);
  }

  async edit(req: Request, res: Response) {
    let team = await teamModel.findById(req.params.id);
    if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

    team = await teamModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    return res.status(StatusCodes.OK).send(team);
  }

  async delete(req: Request, res: Response) {
    const team = await teamModel.findByIdAndDelete(req.params.id);
    if (!team) return res.status(StatusCodes.NOT_FOUND).send("Team not found");

    return res.status(StatusCodes.OK).send(`Team with id: ${req.params.id} has been deleted`);
  }
}