import express, { Request, Response } from "express";
import teamModel from "../models/team.model";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import create from "../src/team/createTeam";
import getAll from "../src/team/getAll";
import getTeam from "../src/team/getTeam";
import editTeam from "../src/team/editTeam";
import deleteTeam from "../src/team/deleteTeam";

export default class TeamController {
  public path = "/team";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.post(`${this.path}/create`, this.create);
    this.router.get(`${this.path}/:id`, this.getTeam);
    this.router.put(`${this.path}/:id`, this.editTeam);
    this.router.delete(`${this.path}/:id`, this.deleteTeam);
  }

  getAll(req: Request, res: Response) {
    getAll(req, res);
  }

  create(req: Request, res: Response) {
    create(req, res);
  }

  getTeam (req: Request, res: Response) {
    getTeam(req, res);
  }

  editTeam (req: Request, res: Response) {
    editTeam(req, res);
  }
  
  deleteTeam(req: Request, res: Response) {
    deleteTeam(req, res);
  }
}