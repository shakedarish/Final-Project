const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const rawVideosFolder = path.join(
  __dirname,
  "..",
  "downloads",
  "video",
  "rawVideos"
);
const generatedVideoFolder = path.join(
  __dirname,
  "..",
  "downloads",
  "video",
  "generatedVideo"
);
const ttsFolder = path.join(__dirname, "..", "downloads", "tts");

const createVideo = async (timeFromEach) => {
  try {
    const audioPath = path.join(ttsFolder, "tts.mp3");
    const mergeVideosPath = path.join(generatedVideoFolder, "mergeVideos.mp4");
    const finalVideoPath = path.join(generatedVideoFolder, "finalVideo.mp4");
    const LastVideoPath = path.join(generatedVideoFolder, "lastVideo.mp4");
    const subtitlesPath = path.join(generatedVideoFolder, "example.srt");

    console.log("!!!!!: " + subtitlesPath);
    console.log("!!!!!: " + audioPath);
    const rawVideos = await fs.promises.readdir(rawVideosFolder);

    const ffmpegCommand = ffmpeg();

    rawVideos.forEach((rawVideo, index) => {
      const videoPath = path.join(rawVideosFolder, rawVideo);
      ffmpegCommand.input(videoPath).inputOptions("-t " + timeFromEach);
    });

    await new Promise((resolve, reject) => {
      ffmpegCommand
        .videoCodec("libx264")
        .audioCodec("aac")
        .on("error", (error) => {
          console.error("Error editing videos: " + error);
          reject(error);
        })
        .on("start", () => {
          console.log("Starting merge");
        })
        .on("end", () => {
          console.log("merged successfully!");
          resolve();
        })
        .mergeToFile(mergeVideosPath);
    });

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(mergeVideosPath)
        .input(audioPath)
        .input(subtitlesPath)
        // .videoCodec("copy")
        .audioCodec("aac")
        .outputOptions("-shortest")
        .outputOptions(
          "-vf subtitles=./downloads/video/generatedVideo/example.srt"
        )
        // .filter("subtitles", subtitlesPath)
        .output(finalVideoPath)
        .on("error", (error) => {
          console.error("Error adding audio overlay: " + error);
          reject(error);
        })
        .on("end", () => {
          console.log("Audio overlay added successfully!");
          resolve();
        })
        .run();
    });

    return finalVideoPath;
  } catch (error) {
    console.error("Error during merge videos: ", error.message);
    return null;
  }
};

const getFileDuration = async (filePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (error, metadata) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          duration: metadata.format.duration,
        });
      }
    });
  });
};

module.exports = {
  getFileDuration,
  createVideo,
};
