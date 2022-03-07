import express, { Request, Response } from "express";

import auth from "../middleware/auth";

import registerUser from "../src/users/registerUser";
import getAllUsers from "../src/users/getAllUsers";
import getUser from "../src/users/getUser";
import editProfile from "../src/users/editProfile";
import sendEmailToUser from "../src/users/sendEmail";
import confirmation from "../src/users/confirmation";
import deleteUser from "../src/users/deleteUser";
import isMentor from "../src/users/isMentor";
import changePassword from "../src/users/changePassword";

export default class UserController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.get(`${this.path}/:id`, this.getUser);
    this.router.get(`${this.path}/confirmation/:token`, this.confirmation);
    this.router.post(`${this.path}/email`, this.sendEmailToUser);
    this.router.put(`${this.path}/changepassword`, auth, this.changePassword);
    this.router.put(`${this.path}/:id`, this.editProfile);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.get(`${this.path}/role/:id`, this.isMentor)
  }

  editProfile(req: Request, res: Response) {
    editProfile(req, res);
  }

  registerUser(req: Request, res: Response) {
    registerUser(req, res);
  }

  getAllUsers(req: Request, res: Response) {
    getAllUsers(req, res);
  }

  getUser(req: Request, res: Response) {
    getUser(req, res);
  }

  changePassword(req: Request, res: Response) {
    changePassword(req, res);
  }

  sendEmailToUser(req: Request, res: Response) {
    sendEmailToUser(req, res);
  }

  confirmation(req: Request, res: Response) {
    confirmation(req, res);
  }

  deleteUser(req: Request, res: Response) {
    deleteUser(req, res);
  }

  isMentor(req: Request, res: Response){
    isMentor(req, res);
  }
}
