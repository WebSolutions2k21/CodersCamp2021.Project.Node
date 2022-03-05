import express, { Request, Response } from "express";

import addMentor from "../src/team/addMentor";
import createTeamProject from "../src/team/createTeamProject";
import deleteUser from "../src/team/deleteUser";


export default class TeamController {
    public path = "/team";
    public router = express.Router();
  
    constructor() {
      this.initializeRoutes();
    }
  
    initializeRoutes() {
      this.router.post(this.path, this.addMentor);
      this.router.post(this.path, this.createTeamProject);
      this.router.delete(this.path, this.deleteUser);
    }
  
    addMentor(req: Request, res: Response) {
        addMentor(req, res);
    }

    createTeamProject(req: Request, res: Response) {
        createTeamProject(req, res);
    }

    deleteUser(req: Request, res: Response) {
        deleteUser(req, res);
    }

  }
  