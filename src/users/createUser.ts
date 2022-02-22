import { Response, Request } from 'express'
const User = require('../../models/user.model')

export default async function createUser(req: Request, res: Response) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      try {
        const savedUser = await user.save()
        res.send({ user: user._id })
      } catch (error) {
        res.status(400).send(error)
      }
  
}
