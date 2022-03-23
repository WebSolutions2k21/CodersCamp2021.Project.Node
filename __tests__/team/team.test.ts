import { Server } from "http";
import request from "supertest";
import teamModel from "../../models/team.model";

let server: Server;

const createTeam = async () => {
  const team = new teamModel({
    teamName: "Test Team2",
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

  describe("POST /create", () => {
    let body: Body | {} = {};
    const exec = async () => {
      return await request(server).post("/team/create").send(body);
    };

    beforeEach(() => {
      body = {
        teamName: "Test Team3",
        usersIds: [{id:"622b9441f2950d6fe0a2b40c"}, {id: "4edd40c86762e0fb12000003"}],
        mentorId:  "621d35383e5c3315845ca334",
        programmingLanguage: [{nameLang: "javascript", level:"basic"}],
        status: true,
      };
    });

    it("should return 400 if team already registered", async () => {
      body = {
        teamName: "Test Team3",
        usersIds: [{id:"622b9441f2950d6fe0a2b40c"}, {id: "4edd40c86762e0fb12000003"}],
        mentorId:  "621d35383e5c3315845ca334",
        programmingLanguage: [{nameLang: "javascript", level:"basic"}],
        status: true,
      };
      await exec();
      let res = await exec();
      expect(res.text).toBe('Team already exists')
      expect(res.status).toBe(400);
    });


    it("should save the team if it is valid", async () => {
      await exec();
      const team = await teamModel.find({ teamname: "Test Team" });
      expect(team).not.toBeNull();
    });
  });


  describe("GET /:id", () => {
    it("should return a team if valid id is entered", async () => {
      const team = await createTeam();

      const res = await request(server).get("/team/" + team._id);

      expect(res.status).toBe(200);
      expect(res.body.teamName).toEqual(team.teamName);
    });
});

  describe("DELETE /:id", () => {
    it("should delete team if id exists", async () => {
      const team = await createTeam();
      const id = team._id;

      const res = await request(server).delete("/team/" + id);
      const teamInDb = await teamModel.findById(id);

      expect(res.status).toBe(200);
      expect(teamInDb).toBeNull();
    });

    it("should return 404 if team not found", async () => {
      const team = {
        _id: "6220f62b09ad6213d719a4b9",
        __v: 0,
      };
      const res = await request(server).delete("/team/" + team._id);

      expect(res.status).toBe(404);
    });
  });
});
