import { Server } from "http";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import teamModel from "../../models/project.model";
import mongoose from "mongoose";

let server: Server;

const createTeam = async () => {
  const team = new teamModel({
    teamName: "Test Team",
    usersIds: ["4edd40c86762e0fb12000002",  "4edd40c86762e0fb12000003",  "4edd40c86762e0fb12000004"],
    mentorId:  "fcee56c86762e0fb12000112",
    programmingLanguage: ["javascript", "java", "python"],
    status: true,
  });

  await team.save();
  return team;
};

describe("/team", () => {
  beforeEach(() => {
    server = require("../../src/server");
  });

  afterEach(async () => {
    await teamModel.deleteMany({});
    await server.close();
  });

  describe("CREATE", () => {
    it("should create new team if it does not exist", async () => {
      const res = await request(server).post("/team/create").send({
        teamName: "Development Team",
        usersIds: ["4edd40c86762e0fb12000005",  "4edd40c86762e0fb12000006",  "4edd40c86762e0fb12000007"],
        mentorId:  "fcee56c86762e0fb12000122",
        programmingLanguage: ["javascript", "java", "python"],
        status: true,
      });

      expect(res.status).toBe(StatusCodes.OK);
    });

    it("should return 400 if project already exists", async () => {
      const team = await createTeam();
      const res = await request(server).post("/team/create").send({
        teamName: team.name,
        usersIds: ["4edd40c86762e0fb12000005",  "4edd40c86762e0fb12000006",  "4edd40c86762e0fb12000007"],
        mentorId:  "fcee56c86762e0fb12000122",
        programmingLanguage: ["javascript", "java", "python"],
        status: true,
      });

      expect(res.status).toBe(400);
    });
  });
});
