import request from "supertest";
import { Server } from "http";
import userModel from "../../models/user.model";

let server: Server;

describe("/auth", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe("POST /", () => {
    let body: {
      email: string;
      password: string;
    };

    const exec = async () => {
      return await request(server).post("/login").send(body);
    };

    beforeEach(async () => {
      await request(server).post("/users/create").send({
        name: "firstuser",
        email: "user@gmail.com",
        password: "12345678",
        confirmPassword: "12345678",
      });

      body = {
        email: "user@gmail.com",
        password: "12345678",
      };
    });

    it("should return 400 if user email is less than 5 charakters", async () => {
      body = { email: "n@y.p", password: "12345678" };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if user password is invalid", async () => {
      body = { email: "user@gmail.com", password: "1234567824" };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if user email is invalid", async () => {
      body = { email: "user@fakemail.com", password: "12345678" };
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
