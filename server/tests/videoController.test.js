const { azureTtsApi } = require("../utils/ttsActions");
jest.mock("../utils/ttsActions");
const ffmpeg = require("fluent-ffmpeg");
const { getFileDuration } = require("../utils/videoEditActions");
const { getVideoUrl } = require("../utils/videoActions");

jest.mock("../utils/videoActions");
jest.mock("fluent-ffmpeg", () => ({
  ffprobe: jest.fn((filePath, callback) => {
    if (filePath === "downloads/tts/tts.mp3") {
      callback(null, { format: { duration: 123 } }); // Mock successful metadata retrieval
    } else {
      callback(new Error("File not found"), null); // Mock an error scenario
    }
  }),
  setFfmpegPath: jest.fn(),
  setFfprobePath: jest.fn(),
}));

//TTS tests with Mock
describe("TTS API Integration", () => {
  beforeEach(() => {
    azureTtsApi.mockClear();
  });
  const expectedPath = "downloads/tts/tts.mp3";

  it("should return a file path on successful TTS generation", async () => {
    azureTtsApi.mockResolvedValue(expectedPath);
    const result = await azureTtsApi("Hello, world!", "en-US-Jessa24kRUS");
    expect(result).toEqual(expectedPath);
    expect(azureTtsApi).toHaveBeenCalledWith(
      "Hello, world!",
      "en-US-Jessa24kRUS"
    );
  });

  it("should return null on failure to generate TTS", async () => {
    azureTtsApi.mockResolvedValue(null);
    const result = await azureTtsApi("generate error", "en-US-Jessa24kRUS");
    expect(result).toBeNull();
    expect(azureTtsApi).toHaveBeenCalledWith(
      "generate error",
      "en-US-Jessa24kRUS"
    );
  });
});

//Get File duration tests with Mock
describe("getFileDuration Functionality", () => {
  it("should return the duration of a video file when metadata is available", async () => {
    const filePath = "downloads/tts/tts.mp3";
    const fileInfo = await getFileDuration(filePath);
    expect(fileInfo.duration).toBe(123); // Expect the mocked duration
  });

  it("should throw an error when the video file metadata is not accessible", async () => {
    const filePath = "invalid/path.mp3";
    await expect(getFileDuration(filePath)).rejects.toThrow("File not found");
  });
});
//Pexels API tests
describe("Video URL Retrieval Functionality", () => {
  beforeEach(() => {
    getVideoUrl.mockClear();
  });

  it("should successfully retrieve a video URL when a suitable match is found", async () => {
    getVideoUrl.mockResolvedValue(
      "https://example.com/perfect_match_video.mp4"
    );

    const keyword = "perfect_match";
    const minDuration = 30;
    const url = await getVideoUrl(keyword, minDuration);

    expect(url).toEqual("https://example.com/perfect_match_video.mp4");
    expect(getVideoUrl).toHaveBeenCalledWith(keyword, minDuration);
  });
  it("should unsuccessfully retrieve a video URL when a suitable match is found", async () => {
    // Simulate a successful search response
    getVideoUrl.mockResolvedValue(
      "https://example.com/perfect_match_video.mp4"
    );

    const keyword = "perfect_match";
    const minDuration = 50;
    const url = await getVideoUrl(keyword, minDuration);

    expect(url).toEqual("https://example.com/perfect_match_video.mp4");
    expect(getVideoUrl).toHaveBeenCalledWith(keyword, minDuration);
  });
});
