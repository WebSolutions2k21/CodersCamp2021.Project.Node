import { Server } from "http";
import userModel from "../../models/user.model";
import request from "supertest";
import User from "../../interfaces/user.interface";
import mongoose from "mongoose";
import sendEmailNewPassword from "../../src/users/sendEmailNewPassword";

let server: Server;

describe("/resetpassword", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe(" PUT /resetpassword", () => {
    let token: string;
    let email: string;

    const exec = async () => {
      return await request(server).put("/users/resetpassword").set("x-auth-token", token).send({ email: email });
    };

    beforeEach(async () => {
      email = "user1@mail.com";
    });

    it("should send email", async () => {
      const email = "user1@mail.com";
      const token = new userModel().generateAuthToken();

      const res = await sendEmailNewPassword(email, token);
      expect(res).not.toBeNull();
      expect(res).not.toBeUndefined();
      expect(res).toBe("Mail has been sent!");
    });
  });
});
