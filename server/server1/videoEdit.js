const ffmpeg = require("fluent-ffmpeg");
const { promises: fsPromises } = require("fs");
const { basename, join } = require("path");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

const folderPath = "./downloadedVideos";
const resoultPath = "./editedVideo";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

async function merge() {
  try {
    const prerollFiles = await fsPromises.readdir(folderPath);
    console.log("prerollFiles: " + prerollFiles);

    if (prerollFiles.length < 2) {
      throw new Error("Insufficient videos for merging.");
    }

    const vide1path = join(folderPath, prerollFiles[0]);
    const vide2path = join(folderPath, prerollFiles[1]);
    console.log("vide1path: " + vide1path);
    console.log("vide2path: " + vide2path);

    const inputName = "video1.mp4";
    const timeFromEach = 5;

    const stat = await fsPromises.stat(vide1path);
    const stat1 = await fsPromises.stat(vide2path);

    ffmpeg()
      .input(vide2path)
      .inputOption("-t " + timeFromEach)
      .input(vide1path)
      .inputOption("-t " + timeFromEach)
      .videoCodec("libx264") // Specify the video codec
      .on("error", (error) => {
        console.error("Error editing videos: " + error);
      })
      .on("start", () => {
        console.log(`Starting merge for ${inputName}`);
      })
      .on("end", () => {
        console.log(`${inputName} merged successfully!`);
      })
      .mergeToFile(join(resoultPath, "lala.mp4"), "./temp");
  } catch (e) {
    console.error("Error during merge:", e.message);
  }
}

module.exports = {
  merge,
};
