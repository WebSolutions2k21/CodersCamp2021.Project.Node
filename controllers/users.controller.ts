import express, { Request, Response } from 'express'

import registerUser from '../src/users/registerUser'
import getAllUsers from '../src/users/getAllUsers'
import editProfile from '../src/users/editProfile'

export default class UserController {
  public path = '/users'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(`${this.path}/register`, this.registerUser);
    // this.router.put(`${this.path}/editProfile`, auth, this.editProfile);
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
}
