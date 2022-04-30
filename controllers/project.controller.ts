import express, { Request, Response } from "express";

import auth from "../middleware/auth";
import findProject from "../middleware/findProject";
import authProject from "../middleware/authProject";
import checkProjectIds from "../middleware/checkProjectIds";

import getAllProject from "../src/projects/getAllProject";
import getProject from "../src/projects/getProject";
import getUserProjects from "../src/projects/getUserProjects";
import createProject from "../src/projects/createProject";
import editProject from "../src/projects/editProject";
import updateProjectMembers from "../src/projects/updateProjectMembers";
import deleteProject from "../src/projects/deleteProject";

export default class ProjectController {
  public path = "/project";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllProject);
    this.router.get(`${this.path}/user-projects`, auth, this.getUserProjects);
    this.router.get(`${this.path}/:projectId`, findProject, this.getProject);
    this.router.post(`${this.path}/create`, checkProjectIds, this.createProject);
    this.router.put(`${this.path}/:projectId`, auth, findProject, authProject, this.editProject);
    this.router.put(
      `${this.path}/members/:projectId`,
      auth,
      findProject,
      authProject,
      checkProjectIds,
      this.updateProjectMembers,
    );
    this.router.delete(`${this.path}/:projectId`, auth, findProject, authProject, this.deleteProject);
  }

  getAllProject(req: Request, res: Response) {
    getAllProject(req, res);
  }

  getProject(req: Request, res: Response) {
    getProject(req, res);
  }

  getUserProjects(req: Request, res: Response) {
    getUserProjects(req, res);
  }
  createProject(req: Request, res: Response) {
    createProject(req, res);
  }

  editProject(req: Request, res: Response) {
    editProject(req, res);
  }

  updateProjectMembers(req: Request, res: Response) {
    updateProjectMembers(req, res);
  }

  deleteProject(req: Request, res: Response) {
    deleteProject(req, res);
  }
}
