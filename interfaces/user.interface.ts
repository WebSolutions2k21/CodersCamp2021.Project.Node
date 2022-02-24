import mongoose from 'mongoose'
import ProgrammingLanguageArr from './programmingLanguageArr.interface'

interface User extends mongoose.Document {
  name: string
  firstname: string
  lastname: string
  email: string
  password: string
  programmingLanguage: ProgrammingLanguageArr[]
  date?: Date
  generateAuthToken(): string
}

export default User
