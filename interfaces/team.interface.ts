import mongoose from 'mongoose';
import ProgrammingLanguage from "./programmingLanguage.interface";

interface Team extends mongoose.Document {
    teamname: any;
    name: string;
    usersIds: [];
    mentorId: string;
    programmingLanguage: ProgrammingLanguage[];
    status: string;
}

export default Team
