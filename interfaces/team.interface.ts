import mongoose from 'mongoose';
import ProgrammingLanguage from "./programmingLanguage.interface";

interface Team extends mongoose.Document {
    teamName: any;
    usersIds: [];
    mentorId: string;
    programmingLanguage: ProgrammingLanguage[];
    status: boolean;
    places: number;
    description: string;
    date?: Date;
}

export default Team