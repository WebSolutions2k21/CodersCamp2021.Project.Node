import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import userModel from '../../models/user.model'

const getUser = async (req: Request, res: Response) => {
  const users = await userModel.findById(req.params.id).select('-password')
  res.status(StatusCodes.OK).send(users)
}

export default getUser
