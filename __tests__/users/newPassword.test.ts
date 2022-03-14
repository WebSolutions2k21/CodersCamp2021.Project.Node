import { Server } from "http";
import userModel from "../../models/user.model";
import request from "supertest";
import User from "../../interfaces/user.interface";
import mongoose from "mongoose";

let server: Server;

async function prepareUser() {
  const user = new userModel({
    username: "user1",
    firstname: "test",
    lastname: "test",
    email: "user1@mail.com",
    password: "12345678",
  });
  await user.save();
  return user;
}

describe("/newpassword", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe(" PUT /newpassword", () => {
    let token: string;
    let newPassword: string;
    let confirmNewPassword: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server)
        .put("/users/newpassword")
        .set("x-auth-token", token)
        .send({ newPassword: newPassword, confirmNewPassword: confirmNewPassword });
    };

    beforeEach(async () => {
      user = await prepareUser();

      token = user.generateAuthToken();
      newPassword = "12345678";
      confirmNewPassword = "12345678";
    });

    it("should return 400 if new password and confirm password isn't the same", async () => {
      (newPassword = "1234567890"), (confirmNewPassword = "12345678");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if user not found", async () => {
      token = new userModel().generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(404);
    });
  });
});
