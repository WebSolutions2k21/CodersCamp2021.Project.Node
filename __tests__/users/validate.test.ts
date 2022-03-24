import { Server } from "http";
import request from "supertest";

import userModel from "../../models/user.model";

let server: Server;

describe("/register", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe("POST /register", () => {
    let body: Body | {} = {};

    const exec = async () => {
      return await request(server).post("/users/register").send(body);
    };

    beforeEach(() => {
      body = {
        username: "test",
        email: "test@test.com",
        password: "12345678",
      };
    });

    it("should return 400 if username is less than 2 characters", async () => {
      body = {
        username: "t",
        email: "test1@test.com",
        password: "12345678",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if username is more than 50 characters", async () => {
      body = {
        username: new Array(52).join("t"),
        email: "test2@test.com",
        password: "12345678",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if password is less than 8 characters", async () => {
      body = {
        username: "test3",
        email: "test3@test.com",
        password: "1234",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if password is more than 500 characters", async () => {
      body = {
        username: "test4",
        email: "test2@test.com",
        password: new Array(502).join("t"),
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if email is less than 5 characters", async () => {
      body = {
        username: "test5",
        email: "t@t.",
        password: "12345678",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if email is more than 250 characters", async () => {
      body = {
        username: "test6",
        email: new Array(252).join("t"),
        password: "12345678",
      };
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
