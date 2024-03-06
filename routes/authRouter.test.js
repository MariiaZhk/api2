import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";

const { TEST_DB_HOST } = process.env;
describe("test /api/auth/login", () => {
  let server = null;
  let db = null;
  beforeAll(async () => {
    db = mongoose.createConnection(TEST_DB_HOST);
    server = app.listen(3000);
  });
  afterAll(async () => {
    await db.close();
    server.close();
  });

  // beforeEach(() => {});

  // afterEach(async () => {
  // await User.deleteMany({});
  // });

  test("test login user", async () => {
    const loginData = {
      email: "maria@yahoo.com",
      password: "123456",
    };
    const response = await request(app).post("/api/auth/login").send(loginData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).not.toBe("");
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
