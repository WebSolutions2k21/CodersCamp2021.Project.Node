import { Server } from "http";
import userModel from "../../models/user.model";
import request from "supertest";

import emailNewPassword from "../../src/utils/emailNewPassword";

let server: Server;

const createUser = async () => {
  const user = new userModel({
    username: "unitest",
    firstname: "test",
    lastname: "test",
    email: "sometest@gmail.com",
    password: "12345678",
  });
  await user.save();

  return user;
};

describe("/resetpassword", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe(" POST /resetpassword", () => {
    let token: string;
    let body: { email: string; token: string } | {} = {};

    const exec = async () => {
      return await request(server).post("/users/resetpassword").set("x-auth-token", token).send(body);
    };

    beforeEach(() => {
      token = new userModel().generateAuthToken();
      body = {
        email: "test@mail.com",
        token: token,
      };
    });

    it("should send email", async () => {
      const email = "sometest@gmail.com";
      const res = await emailNewPassword(email, token);
      expect(res).not.toBeNull();
      expect(res).not.toBeUndefined();
      expect(res).toBe("Mail has been sent!");
    });

    it("should send the email if it is valid", async () => {
      const user = await createUser();
      body = { email: "sometest@gmail.com" };

      const res = await exec();

      expect(res.status).toBe(200);
    });
  });
});
