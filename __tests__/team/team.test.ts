import { Server } from "http";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import teamModel from "../../models/project.model";

let server: Server;

const createTeam = async () => {
  const team = new teamModel({
    teamName: "Test Team",
    usersIds: [{id:"622b9441f2950d6fe0a2b40c"}, {id: "4edd40c86762e0fb12000003"}],
    mentorId:  "621d35383e5c3315845ca334",
    programmingLanguage: [{nameLang: "javascript", level:"basic"}],
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
        usersIds: [{id:"622b9441f2950d6fe0a2b40c"}, {id: "4edd40c86762e0fb12000003"}],
        mentorId:   "621d35383e5c3315845ca334",
        programmingLanguage: [{nameLang: "javascript", level:"basic"}],
        status: true,
      });

      expect(res.status).toBe(StatusCodes.OK);
    });

    it("should return 400 if project already exists", async () => {
      const team = await createTeam();
      const res = await request(server).post("/team/create").send({
        teamName: team.name,
        usersIds: [{id:"622b9441f2950d6fe0a2b40c"}, {id: "4edd40c86762e0fb12000003"}],
        mentorId: "621d35383e5c3315845ca334",
        programmingLanguage: [{nameLang: "javascript", level:"basic"}],
        status: true,
      });

      expect(res.status).toBe(400);
    });
  });
});

