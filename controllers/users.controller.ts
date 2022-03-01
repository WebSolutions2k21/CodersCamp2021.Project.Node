import express, { Request, Response } from 'express'

import registerUser from '../src/users/registerUser'
import getAllUsers from '../src/users/getAllUsers'
import editProfile from '../src/users/editProfile'
import getUser from '../src/users/getUser'

export default class UserController {
  public path = '/users'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(`${this.path}/register`, this.registerUser);
    this.router.put(`${this.path}/:id`, this.editProfile);
    this.router.get(`${this.path}/:id`, this.getUser);
  }

  editProfile(req: Request, res: Response) {
    editProfile(req, res)
  }

  registerUser(req: Request, res: Response) {
    registerUser(req, res)
  }

  getAllUsers(req: Request, res: Response) {
    getAllUsers(req, res)
  }

  getUser(req: Request, res: Response) {
    getUser(req, res)
  }
}
