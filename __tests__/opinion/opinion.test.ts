import { Server } from "http";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import opinionModel from "../../models/opinion.model";
import mongoose from "mongoose";

let server: Server;

const createOpinion = async () => {
  const opinion = new opinionModel({
    name: "Opinia testowa",
    userId: "4edd40c86762e0fb12000003",
    mentorId: "fcee56c86762e0fb12000112",
    content: "Fantastyczna opinia",
  });

  await opinion.save();
  return opinion;
};

describe("/opinion", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });

  afterEach(async () => {
    await opinionModel.deleteMany({});
    await server.close();
  });

  describe("CREATE", () => {
    it("should create new opinion", async () => {
      const res = await request(server).post("/opinion/create").send({
        name: "opinia testowa 123",
        userId: "4edd40c86762e0fb12000003",
        mentorId: "fcee56c86762e0fb12000112",
        content: "Opinia pięciogwiadkowa",
      });

      expect(res.status).toBe(StatusCodes.OK);
    });
  });

    describe("EDIT", () => {
    it("should return 404 if opinion not found", async () => {
      let nonExistingId = "1420f53b09ff6213d719b4b2";

      const res = await request(server)
        .put("/opinion/" + nonExistingId)
        .send({
          name: "jakies tam name",
          userId: "ffdd40c86762e0fb12000003",
          mentorId: "ffee56c86762e0fb12000112",
          content: "content Text",
        });

      expect(res.status).toBe(404);
    });
  });

  describe("GET /:id", () => {
    it("should return existing opinion if valid id is present", async () => {
      const opinion = await createOpinion();

      const res = await request(server).get("/opinion/" + opinion._id);

      expect(res.status).toBe(200);
      expect(res.body.stars).toEqual(opinion.stars);
      expect(res.body.userId).toBe(opinion.userId.toString());
      expect(res.body.mentorId).toBe(opinion.mentorId?.toString());
      expect(res.body.content).toBe(opinion.content);
    });

    it("should return 404 if opinion not found by id", async () => {
      let nonExistingId = "1420f53b09ff6213d719b4b2";

      const res = await request(server).get("/opinion/" + nonExistingId);

      expect(res.status).toBe(404);
    });
  });

  describe("GET /getAll", () => {
    it("should return all opinions", async () => {
      const opinions = [{ name: "opinion 1" }, { name: "opinion 2" }];
      await opinionModel.collection.insertMany(opinions);

      const res = await request(server).get("/opinion/");

      expect(res.status).toBe(200);
      expect(res.body.length).toEqual(2);
    });
  });

  describe("DELETE", () => {
    it("should delete opinion if exists", async () => {
      const opinion = await createOpinion();

      const res = await request(server).delete("/opinion/" + opinion._id);

      expect(res.status).toBe(200);
    });

    it("should return 404 if opinion not exist", async () => {
      let nonExistingId = "1420f53b09ff6213d719b4b2";
      const res = await request(server).delete("/opinion/" + nonExistingId);

      expect(res.status).toBe(404);
    });
  });

});