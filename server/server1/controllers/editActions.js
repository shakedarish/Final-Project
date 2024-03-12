const ffmpeg = require("fluent-ffmpeg");
const { promises: fsPromises } = require("fs");
const { basename, join } = require("path");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

const folderPath = "./downloadedVideos";
const resoultPath = "./editedVideo";
const voiceFolder = "./downloadedTts";

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
    const audioPath = join(voiceFolder, "dummyVoice.mp3");
    const lalaVideo = join(resoultPath, "lala.mp4");
    console.log("vide1path: " + vide1path);
    console.log("vide2path: " + vide2path);
    console.log("audioPath: " + audioPath);
    console.log("lala video: " + lalaVideo);

    const inputName = "video1.mp4";
    const timeFromEach = 5;

    const stat = await fsPromises.stat(vide1path);
    const stat1 = await fsPromises.stat(vide2path);

    const videoInfo = await getVideoInfo(lalaVideo);
    const audioInfo = await getAudioInfo(audioPath);

    const videoDuration = videoInfo.duration;
    const audioDuration = audioInfo.duration;
    console.log("videoi duraion: " + videoDuration);
    console.log("audioDuration: " + audioDuration);

    const outputVideoPath = join(resoultPath, "video_sound.mp4");

    ffmpeg()
      .input(lalaVideo)
      .input(audioPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .output(outputVideoPath)
      .addOption("-shortest")
      .on("error", (error) => {
        console.error("Error editing videos: " + error);
      })
      .on("start", () => {
        console.log(`Starting merge for ${inputName}`);
      })
      .on("end", () => {
        console.log(`${inputName} merged successfully!`);
      })
      .run();

    // ffmpeg()
    //   .input(vide2path)
    //   .inputOption("-t " + timeFromEach)
    //   .input(vide1path)
    //   .inputOption("-t " + timeFromEach)
    //   .videoCodec("libx264") // Specify the video codec
    //   .on("error", (error) => {
    //     console.error("Error editing videos: " + error);
    //   })
    //   .on("start", () => {
    //     console.log(`Starting merge for ${inputName}`);
    //   })
    //   .on("end", () => {
    //     console.log(`${inputName} merged successfully!`);
    //   })
    //   .mergeToFile(join(resoultPath, "video_sound.mp4"), "./temp");
  } catch (e) {
    console.error("Error during merge:", e.message);
  }
}

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
};
