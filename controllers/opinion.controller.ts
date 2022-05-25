import auth from "../middleware/auth";
import checkOpinionIds from "../middleware/checkOpinionIds";
import express, { Request, Response } from "express";
import createOpinion from "../src/opinions/createOpinion";
import editOpinion from "../src/opinions/editOpinion";
import deleteOpinion from "../src/opinions/deleteOpinion";
import getOpinion from "../src/opinions/getOpinion";
import getAllOpinions from "../src/opinions/getAllOpinions";
import findOpinion from "../middleware/findOpinion";

export default class OpinionController {
  public path = "/opinion";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllOpinions);
    this.router.get(`${this.path}/:opinionId`, findOpinion, this.getOpinion);
    this.router.post(`${this.path}/create`, auth, checkOpinionIds, this.createOpinion);
    this.router.put(`${this.path}/edit/:opinionId`, auth, findOpinion, this.editOpinion);
    this.router.delete(`${this.path}/:opinionId`, auth, findOpinion, this.deleteOpinion);
  }

  getAllOpinions(req: Request, res: Response) {
    getAllOpinions(req, res);
  }

  getOpinion(req: Request, res: Response) {
    getOpinion(req, res);
  }

  createOpinion(req: Request, res: Response) {
    createOpinion(req, res);
  }

  editOpinion(req: Request, res: Response) {
    editOpinion(req, res);
  }

  deleteOpinion(req: Request, res: Response) {
    deleteOpinion(req, res);
  }
}
