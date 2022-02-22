import  mongoose  from "mongoose";

import ProgrammingLanguageArr from "./programmingLanguageArr.interface";

interface User extends mongoose.Document{
    name: string;  
    email: string;
    password: string;
    // programmingLanguage: ProgrammingLanguageArr[];
    date?: Date;
}

export default User;