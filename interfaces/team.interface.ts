import mongoose from 'mongoose';
import ProgrammingLanguage from "./programmingLanguage.interface";

interface Team extends mongoose.Document {
    teamName: any;
    usersIds: [];
    mentorId: string;
    programmingLanguage: ProgrammingLanguage[];
    status: boolean;
}

export default Team
