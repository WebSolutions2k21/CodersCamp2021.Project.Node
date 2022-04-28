import sendEmail from "../../src/utils/email";
import userModel from "../../models/user.model";

describe("sendEmail", () => {
  it("should send email", async () => {
    const token = new userModel().generateAuthToken();
    const email = "test@test.com";
    const res = await sendEmail(email, token);
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
  });
});

describe("error", () => {
  it("tests error with async/await", async () => {
    try {
      const token = new userModel().generateAuthToken();
      const email = "test@test.com";
      const res = await sendEmail(email, token);
    } catch (e) {
      expect(e).toEqual({
        error: "Something is wrong!",
      });
      expect(e).toMatch("error");
      expect.assertions(2);
    }
  });
});
