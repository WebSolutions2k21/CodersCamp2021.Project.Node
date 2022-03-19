import express, { Request, Response } from "express";
import createProject from "../src/projects/createProject";
import editProject from "../src/projects/editProject";
import getProject from "../src/projects/getProject";
import getAllProject from "../src/projects/getAllProject";
import deleteProject from "../src/projects/deleteProject";
export default class ProjectController {
  public path = "/project";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllProject);
    this.router.get(`${this.path}/:id`, this.getProject);
    this.router.post(`${this.path}/create`, this.createProject);
    this.router.put(`${this.path}/:id`, this.editProject);
    this.router.delete(`${this.path}/:id`, this.deleteProject);
  }

  createProject(req: Request, res: Response) {
    createProject(req, res);
  }

  editProject(req: Request, res: Response) {
    editProject(req, res);
  }

  getProject(req: Request, res: Response) {
    getProject(req, res);
  }

  getAllProject(req: Request, res: Response) {
    getAllProject(req, res);
  }

  deleteProject(req: Request, res: Response) {
    deleteProject(req, res);
  }
}
