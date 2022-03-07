import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import userModel from '../../models/user.model'

const isMentor= async (req: Request, res: Response) => {
  const user = await userModel.findById(req.params.id)
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).send('User not found')
  }
  console.log(user.isMentor)
  res.status(StatusCodes.OK).send(user.isMentor)
}

export default isMentor
