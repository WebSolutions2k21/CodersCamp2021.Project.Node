import express, { Request, Response } from "express";

export default class AppController {
  public path = "";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.handleRequest);
  }
  handleRequest(req: Request, res: Response) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('Welcome to our Node.js App.');
    res.end();
};
}   