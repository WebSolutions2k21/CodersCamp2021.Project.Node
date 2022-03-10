import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import projectModel from "../models/project.model";
import mongoose from "mongoose";

export default class ProjectController {
  public path = "/project";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.get);
    this.router.post(`${this.path}/create`, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  async create(req: Request, res: Response) {
    let project = await projectModel.findOne({ name: req.body.name });
    if (project) {
      return res.status(400).send("Project already exists");
    } else {
      project = new projectModel({
        name: req.body.name,
        userId: mongoose.Types.ObjectId(req.body.userId),
        mentorId: mongoose.Types.ObjectId(req.body.mentorId),
        teamId: mongoose.Types.ObjectId(req.body.teamId),
        content: req.body.content,
        status: req.body.content,
      });

      await project.save();
      res.send(project);
    }
  }

  async edit(req: Request, res: Response) {
    let project = await projectModel.findById(req.params.id);
    if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

    project = await projectModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    return res.status(StatusCodes.OK).send(project);
  }

  async get(req: Request, res: Response) {
    const project = await projectModel.findById(req.params.id);
    if (project === null) {
      res.status(404).send();
      return;
    }

    res.status(StatusCodes.OK).send(project);
  }

  async getAll(req: Request, res: Response) {
    const projects = await projectModel.find().select("-_id");
    res.status(StatusCodes.OK).send(projects);
  }

  async delete(req: Request, res: Response) {
    const project = await projectModel.findByIdAndDelete(req.params.id);
    if (!project) return res.status(StatusCodes.NOT_FOUND).send("Project not found");

    return res.status(StatusCodes.OK).send(`Project with id: ${req.params.id} has been deleted`);
  }
}
