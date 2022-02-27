import bcrypt from 'bcrypt'
import { Response, Request } from 'express'

import validate from '../auth/validateAuth'
import userModel from '../../models/user.model'

export default async function registerUser(req: Request, res: Response) {
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  let user = await userModel.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).send('That user already exisits!')
  } else {
    user = new userModel({
      name: req.body.name,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      date: req.body.date
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    res.send(user)
  }
}
