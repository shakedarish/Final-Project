const request = require("supertest");
const app = require("../index");

jest.mock("../utils/dbController", () => ({
  uploadData: jest.fn().mockImplementation((req, res) => {
    const { email, userName } = req.body;

    if (email === "existing@example.com") {
      res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    } else {
      res.status(200).json({ success: true, message: userName });
    }
  }),
  checkLogin: jest.fn().mockImplementation((req, res) => {
    const { email, password } = req.body;
    // Simulate a login attempt
    if (email === "user@example.com" && password === "password123") {
      res.status(200).json({ success: true, message: "Mock User" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Incorrect credentials" });
    }
  }),
}));

let server;
beforeAll((done) => {
  server = app.listen(0, () => done()); // Listening on a random port
});

afterAll((done) => {
  server.close(() => done());
});

describe("Database tests", () => {
  it("should handle new user registration successfully", async () => {
    const userData = {
      email: "new@example.com",
      password: "newPassword123",
      userName: "NewUser",
    };
    const response = await request(app).post("/sign").send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, message: "NewUser" });
  });

  it("should prevent registration with an existing email", async () => {
    const userData = {
      email: "existing@example.com",
      password: "existingPassword123",
      userName: "ExistingUser",
    };
    const response = await request(app).post("/sign").send(userData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Email already exists.",
    });
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

  it("should return 500 for incorrect credentials", async () => {
    const loginData = {
      email: "user@example.com",
      password: "wrongPassword",
    };
    const response = await request(app).post("/login").send(loginData);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "Incorrect credentials",
    });
  });
});
