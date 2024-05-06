const request = require("supertest");
const app = require("../index");
const { getSearchKeywords } = require("../utils/llmController");

jest.mock("../utils/llmController", () => ({
  llmLogic: jest.fn((req, res) => {
    const { text } = req.body;
    if (text.includes("error")) {
      res
        .status(500)
        .json({ success: false, message: "error in chat completion" });
    } else {
      res.status(200).json({ success: true, message: "Successful response" });
    }
    return res; // Make sure to return res to end the function execution
  }),
  getSearchKeywords: jest.fn(),
  llmCall: jest.fn(),
}));

describe("LLM API Interaction correct response", () => {
  it("should handle successful API responses", async () => {
    const response = await request(app).post("/completion").send({
      text: "create a script",
      callType: "new",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Successful response",
    });
  });

  it("should handle API errors", async () => {
    const response = await request(app).post("/completion").send({
      text: "generate an error",
      callType: "new",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "error in chat completion",
    });
  });
});
// Adding tests for getSearchKeywords
describe("LLM Controller - getSearchKeywords", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears any previous mocking info
  });

  it("should return keywords when API call is successful", async () => {
    const mockResponseExample = ["video", "editing"];
    getSearchKeywords.mockResolvedValue(mockResponseExample);
    const text = "How to edit Your video?";

    const keywords = await getSearchKeywords(text);

    expect(getSearchKeywords).toHaveBeenCalledWith(text);
    expect(keywords).toEqual(
      expect.arrayContaining([expect.stringMatching(/video|editing/)])
    );
  });

  it("should return null when API call fails", async () => {
    getSearchKeywords.mockResolvedValue(null);
    const text = "invalid input";

    const keywords = await getSearchKeywords(text);

    expect(getSearchKeywords).toHaveBeenCalledWith(text);
    expect(keywords).toBeNull();
  });
});
