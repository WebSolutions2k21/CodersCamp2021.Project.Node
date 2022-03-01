import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import userModel from '../../models/user.model'

const deleteUser = async (req: Request, res: Response) => {
  const user = await userModel.findByIdAndDelete(req.params.id)
  console.log('user', user)
  if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found')

  await user.save()
  return res.status(StatusCodes.OK).send(user)
}

export default deleteUser
