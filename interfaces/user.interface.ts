import mongoose from "mongoose";

interface User extends mongoose.Document {
	name: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	generateAuthToken(): string;
	    // programmingLanguage: ProgrammingLanguageArr[];
		// date?: Date;
}

export default User;
