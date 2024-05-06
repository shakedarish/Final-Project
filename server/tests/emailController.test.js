const request = require("supertest");
const app = require("../index"); // Ensure that this points to your main server file where `app` is defined

jest.mock("../utils/emailController");
const emailController = require("../utils/emailController");

// Mock implementation of sendEmil function
emailController.sendEmil.mockImplementation((req, res) => {
  const { email } = req.body;
  // Simulate email send functionality based on input
  if (email === "success@example.com") {
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email" });
  }
});

describe("Email API Endpoint Tests", () => {
  it("should send an email successfully", async () => {
    const res = await request(app).post("/sendEmail").send({
      firstName: "John",
      lastName: "Doe",
      email: "success@example.com",
      phoneNumber: "1234567890",
      message: "Hello, this is a test email.",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Email sent successfully",
    });
  });

  it("should handle email send failures", async () => {
    const res = await request(app).post("/sendEmail").send({
      firstName: "John",
      lastName: "Doe",
      email: "fail@example.com",
      phoneNumber: "1234567890",
      message: "Hello, this is a test email.",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Failed to send email",
    });
  });
});
