import express, { Application } from 'express'
import Controller from '../../interfaces/controller.interface'

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

export default class App {
  public app: Application
  private port = process.env.PORT || 3000
  
  constructor(controllers: Controller[]) {
    this.app = express()

    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  connectToDatabase() {
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    ).then(() => console.log(`Connected to MongoDB`))
    .catch((err: { message: any }) => console.log(err.message));
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })
  }
}
