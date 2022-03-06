import sendEmail from "../../src/utils/email";
import userModel from "../../models/user.model";

describe("sendEmail", () => {
  it("should send email", async () => {
    jest.setTimeout(30000);
    const token = new userModel().generateAuthToken();
    const email = "test@test.com";
    const res = await sendEmail(email, token);
    console.log(res);
    expect(res).not.toBeNull();
    expect(res).not.toBeUndefined();
    expect(res).toBe("Mail send!");
  });
});

describe("error", () => {
  it("tests error with async/await", async () => {
    try {
      jest.setTimeout(30000);
      const token = new userModel().generateAuthToken();
      const email = "test@test.com";
      const res = await sendEmail(email, token);
      console.log(res);
    } catch (e) {
      expect(e).toEqual({
        error: "Mail doesn't send!",
      });
      expect.assertions(1);
    }
  });
});