const request = require("supertest");
const app = require("../index"); // make sure this is correctly importing the express app without listening

let server;
jest.mock("../utils/dbController", () => ({
  checkLogin: jest.fn().mockImplementation((req, res) => {
    const { email, password } = req.body;
    // Simulate a successful login
    if (email === "user@example.com" && password === "password123") {
      res.status(200).json({ success: true, message: "Mock User" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Incorrect credentials" });
    }
  }),
  // Add other methods as necessary
}));
beforeAll((done) => {
  server = app.listen(0, () => done()); // Listening on a random port
});

afterAll((done) => {
  server.close(() => done());
});

describe("Server API Tests", () => {
  it("should check the health endpoint", async () => {
    const response = await request(server).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Server is up and running");
  });

  it("should return 200 for existing users", async () => {
    const loginData = {
      email: "user@example.com",
      password: "password123",
    };
    const response = await request(app).post("/login").send(loginData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, message: "Mock User" });
  });

  it("should return 500 for non-existing users", async () => {
    const loginData = {
      email: "nonexistent@example.com",
      password: "incorrect",
    };
    const response = await request(app).post("/login").send(loginData);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "Incorrect credentials",
    });
  });
});
