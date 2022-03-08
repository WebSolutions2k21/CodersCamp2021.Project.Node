import { Server } from "http";
import request from "supertest";

import userModel from "../../models/user.model";

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

describe("/users", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    await server.close();
  });

  describe("GET /:id", () => {
    it("should return a user if valid id is entered", async () => {
      const user = await createUser();

      const res = await request(server).get("/users/" + user._id);

      expect(res.status).toBe(200);
      expect(res.body.username).toEqual(user.username);
      expect(res.body.firstname).toEqual(user.firstname);
      expect(res.body.lastname).toEqual(user.lastname);
      expect(res.body.email).toEqual(user.email);
    });

    it("should return a error if user does not exist", async () => {
      const user = {
        _id: "6220f62b09ad6213d719a4b9",
        __v: 0,
      };

      const res = await request(server).get("/users/" + user._id);

      expect(res.status).toBe(404);
    });
  });

  describe("GET / getAllUsers", () => {
    it("should return all users", async () => {
      const users = [{ email: "user1@test.xyz" }, { email: "user2@test.xyz" }];
      await userModel.collection.insertMany(users);

      const res = await request(server).get("/users/");

      expect(res.status).toBe(200);
      expect(res.body.length).toEqual(2);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete user if id exists", async () => {
      const user = await createUser();
      const id = user._id;

      const res = await request(server).delete("/users/" + id);
      const userInDb = await userModel.findById(id);

      expect(res.status).toBe(200);
      expect(userInDb).toBeNull();
    });

    it("should return 404 if user not found", async () => {
      const user = {
        _id: "6220f62b09ad6213d719a4b9",
        __v: 0,
      };
      const res = await request(server).delete("/users/" + user._id);

      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /:id", () => {
    it("should edit user is different email and user is no verified", async () => {
      const user = await createUser();

      const id = user._id;
      const updatedBody = {
        username: "test editt",
        email: "updateEmail@test.com",
      };
      const res = await request(server)
        .patch("/users/" + id)
        .send(updatedBody);

      expect(res.status).toBe(200);
      expect(res.body.username).toEqual(updatedBody.username);
      expect(res.body.email).toEqual(updatedBody.email);
    });

    it("shouldn't edit user if data isn't valid", async () => {
      const user = await createUser();
      const id = user._id;
      const updatedBody = {
        username: "test editt",
        email: "updateEmail",
      };

      const res = await request(server)
        .patch("/users/" + id)
        .send(updatedBody);

      expect(res.status).toBe(400);
    });

    it("should display warning if no user", async () => {
      const updatedBody = {
        _id: "6220f62b09ad6213d719a9",
        username: "test editt",
      };
      const id = "6220f62b09ad6213d719a9";

      const res = await request(server)
        .patch("/users/" + id)
        .send(updatedBody);

      expect(res.status).toBe(400);
    });

    it("should display warning if user is veryfied and try change email", async () => {
      //   //TODO waiting for confirmation
      //   const user = await createUser();
      //   const token = user.generateAuthToken();
      //   // const exec = async () => {
      //   //   console.log("token w exec", token);
      //   //   return await request(server).get("/users/confirmation/" + token);
      //   // };
      //   console.log("#########res", user.isVerified);
      //   const reqConfirm = await request(server).get("/users/confirmation/" + token).send();
      //   // expect(reqConfirm.status).toBe(200);
      //   console.log("#########res after confirm", user.isVerified);
      //   //   const res = await request(server)
      //   //  .patch("/users/" + user.id)
      //   //  .send(userUdated);
      //   //   console.log("#########res after confirmation", res.body);
      // });
    });

    describe("GET role/:id", () => {
      it("should return user as user", async () => {
        const user = await createUser();
        const id = user._id;

        const res = await request(server).get("/users/role/" + id);

        expect(res.status).toBe(200);
        expect(res.body).toBe(false);
      });

      it("should return user as mentor", async () => {
        const user = await createUser();
        const id = user._id;
        const updatedBody = {
          username: "test editt",
          email: "updateEmail33@test.com",
          isMentor: true,
        };

        await request(server)
          .patch("/users/" + id)
          .send(updatedBody);

        const res = await request(server).get("/users/role/" + id);

        expect(res.body).toEqual(true);
      });

      it("should return a error if user does not exist", async () => {
        const user = {
          _id: "6220f62b09ad6213d719a4b9",
          __v: 0,
        };

        const res = await request(server).get("/users/role/" + user._id);

        expect(res.status).toBe(404);
      });
    });
  });
});
