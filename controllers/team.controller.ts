import express, { Request, Response } from "express";
import create from "../src/team/createTeam";
import getAll from "../src/team/getAll";
import getTeam from "../src/team/getTeam";
import editTeam from "../src/team/editTeam";
import deleteTeam from "../src/team/deleteTeam";
import joinTeam from "../src/team/joinTeam";
import getUserTeam from "../src/team/getUserTeam";
import auth from "../middleware/auth";
import { times } from "lodash";
export default class TeamController {
  public path = "/team";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/user-team`, auth, this.getUserTeam);
    this.router.post(`${this.path}/create`, this.create);
    this.router.get(`${this.path}/:id`, this.getTeam);
    this.router.put(`${this.path}/:id`, this.editTeam);
    this.router.delete(`${this.path}/:id`, this.deleteTeam);
    this.router.put(`${this.path}/join/:id`, auth, this.joinTeam);
  }

  getAll(req: Request, res: Response) {
    getAll(req, res);
  }

  create(req: Request, res: Response) {
    create(req, res);
  }

  getTeam(req: Request, res: Response) {
    getTeam(req, res);
  }

  editTeam(req: Request, res: Response) {
    editTeam(req, res);
  }

  deleteTeam(req: Request, res: Response) {
    deleteTeam(req, res);
  }

  joinTeam(req: Request, res: Response) {
    joinTeam(req, res);
  }

  getUserTeam(req: Request, res: Response) {
    getUserTeam(req, res);
  }
}
