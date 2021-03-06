import Joi from 'joi'

export default function validate(req: string) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    firstname: Joi.string().min(0).max(100),
    lastname: Joi.string().min(0).max(100),
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(8).max(500).required(),
    confirmpassword: Joi.string().min(8).max(500).required().valid(Joi.ref('password')),
  })
  return schema.validate(req)
}