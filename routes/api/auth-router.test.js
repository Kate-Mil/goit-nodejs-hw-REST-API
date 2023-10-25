import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/User.js";

const { TEST_DB_HOST, PORT } = process.env;

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    mongoose.connection.close();
    server.close();
  });

  test("test login with correct data", async () => {
    const loginData = {
      password: "1234567",
      email: "Kate@gmail.com",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body.token);
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");

    const user = await User.findOne({ email: loginData.email });
    expect(user).toBeDefined();
    expect(user.token).toBe(body.token);
  });
});
