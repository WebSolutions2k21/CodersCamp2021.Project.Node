import mongoose from 'mongoose'
import ProgrammingLanguageArr from './programmingLanguageArr.interface'

interface Team extends mongoose.Document {
    name: string
    usersIds: []
    mentorId: string
    programmingLanguage: ProgrammingLanguageArr[]
    status: string
}

export default Team
