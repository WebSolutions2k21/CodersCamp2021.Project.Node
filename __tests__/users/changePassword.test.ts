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
    password: "22222222",
  });
  await user.save();
  return user;
}

describe("/changepassword", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe(" PUT /changepassword", () => {
    let token: string;
    let oldPassword: string;
    let newPassword: string;
    let confirmNewPassword: string;
    let user: User & mongoose.Document<any>;

    const exec = async () => {
      return await request(server)
        .put("/users/changepassword")
        .set("x-auth-token", token)
        .send({ oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword });
    };

    beforeEach(async () => {
      user = await prepareUser();

      token = user.generateAuthToken();
    });

    it("should return 400 if new password and confirm password isn't the same", async () => {
      (oldPassword = "22222222"), (newPassword = "123456780"), (confirmNewPassword = "1234567890");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if oldPassword is invalid", async () => {
      (oldPassword = "11111111"), (newPassword = "123456789"), (confirmNewPassword = "123456789");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 404 if user not found", async () => {
      token = new userModel().generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(404);
    });
  });
});
