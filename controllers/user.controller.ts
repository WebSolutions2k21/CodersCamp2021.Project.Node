import express, { Request, Response } from 'express'
import createUser from '../src/users/createUser'

export default class UserController {
  public path = '/users'
  public router = express.Router()

  constructor() {
    this.initializeRoutes()
  }

  initializeRoutes() {
    this.router.post(`${this.path}/create`, this.createUser)
  }

  createUser(req: Request, res: Response) {
    createUser(req, res)
  }
}
