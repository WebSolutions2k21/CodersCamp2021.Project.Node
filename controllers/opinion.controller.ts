import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import opinionModel from "../models/opinion.model";
import mongoose from "mongoose";

export default class OpinionController {
  public path = "/opinion";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.post(`${this.path}/create`, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.remove);
  }

  async create(req: Request, res: Response) {
    console.log("create", req.body);

    let opinion = await opinionModel.findOne({ name: req.body.name });

    console.log("creating");
    opinion = new opinionModel({
      name: req.body.name,
      userId: mongoose.Types.ObjectId(req.body.userId),
      mentorId: mongoose.Types.ObjectId(req.body.mentorId),
      content: req.body.content,
    });

    await opinion.save();
    res.send(opinion);
  }

  async edit(req: Request, res: Response) {
    console.log("edit", req.body);

    let opinion = await opinionModel.findById(req.params.id);
    if (!opinion)
      return res.status(StatusCodes.NOT_FOUND).send("opinion not found");

    opinion = await opinionModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    return res.status(StatusCodes.OK).send(opinion);
  }

  async remove(req: Request, res: Response) {
    console.log("edit", req.body);

    let opinion = await opinionModel.findByIdAndDelete(req.params.id);
    if (!opinion)
      return res.status(StatusCodes.NOT_FOUND).send("opinion not found");

    return res.status(StatusCodes.OK).send(opinion);
  }

  async getAll(req: Request, res: Response) {
    console.log("getAll", req.body);

    const opinions = await opinionModel.find().select("-_id");
    res.status(StatusCodes.OK).send(opinions);
  }
}
//