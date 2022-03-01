import mongoose from 'mongoose'
import ProgrammingLanguage from './programmingLanguage.interface'

interface User extends mongoose.Document {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  programmingLanguage?: ProgrammingLanguage[]
  date?: Date
  isMentor: boolean
  generateAuthToken(): string
}

export default User
