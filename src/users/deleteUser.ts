import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import userModel from '../../models/user.model'

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.params.id)
  if (!user) return res.status(StatusCodes.NOT_FOUND).send('No user found')

  return res.status(StatusCodes.OK).send(user)
}

export default deleteUser
