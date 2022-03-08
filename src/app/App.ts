import express, { Application } from "express";
import config from "config";
const mongoose = require("mongoose");

import Controller from "../../interfaces/controller.interface";

export default class App {
  public app: Application;
  private port = process.env.PORT || 5000;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  connectToDatabase() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_DB_NAME } = process.env;
    const dbName = !!config.get("dbName") ? <string>config.get("dbName") : MONGO_DB_NAME;

    mongoose
      .connect(`mongodb+srv://@cluster0.sfyfo.mongodb.net/`, {
        dbName: dbName,
        user: MONGO_USER,
        pass: MONGO_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      })
      .then(() => console.log(`Connected to MongoDB ${dbName}`))
      .catch((err: { message: any }) => console.log(err.message));
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
