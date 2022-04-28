import express, { Request, Response } from "express";
import createOpinion from "../src/opinions/createOpinion";
import editOpinion from "../src/opinions/editOpinion";
import deleteOpinion from "../src/opinions/deleteOpinion";
import getOpinion from "../src/opinions/getOpinion";
import getAllOpinions from "../src/opinions/getAllOpinions";

export default class OpinionController {
  public path = "/opinion";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllOpinions);
    this.router.get(`${this.path}/:id`, this.getOpinion);
    this.router.post(`${this.path}/create`, this.createOpinion);
    this.router.put(`${this.path}/edit/:id`, this.editOpinion);
    this.router.delete(`${this.path}/:id`, this.deleteOpinion);
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

  getOpinion(req: Request, res: Response) {
    getOpinion(req, res);
  }

  getAllOpinions(req: Request, res: Response) {
    getAllOpinions(req, res);
  }
}
