import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import userModel from "../../models/user.model";

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toString(),
    };
    const user = new userModel(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
    expect(decoded).toMatchObject(payload);
  });
});
