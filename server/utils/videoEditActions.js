const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
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
    const tempVideoPath = path.join(generatedVideoFolder, "tempVideo.mp4");
    const subtitlesPath = path.join(generatedVideoFolder, "subtitles.srt");
    const musicPath = path.join(generatedVideoFolder, "backgroundMusic.mp3");

    const rawVideos = (await fs.promises.readdir(rawVideosFolder)).filter(
      (file) => path.extname(file) === ".mp4"
    );

    // Iterate through each video file to remove audio stream
    const removeAudioPromises = [];
    rawVideos.forEach((rawVideo, index) => {
      const videoPath = path.join(rawVideosFolder, rawVideo);
      removeAudioPromises.push(removeAudioStream(videoPath, index));
    });

    await Promise.all(removeAudioPromises);
    console.log("All videos are clear form audio stream");

    // Iterate through each video file to resize it if needed
    const resizePromises = [];
    rawVideos.forEach((rawVideo, index) => {
      const videoPath = path.join(rawVideosFolder, rawVideo);
      resizePromises.push(resizeVideo(videoPath, index));
    });

    await Promise.all(resizePromises);
    console.log("All videos are in scale 960:540");

    const ffmpegCommand = ffmpeg();

    rawVideos.forEach((rawVideo) => {
      const videoPath = path.join(rawVideosFolder, rawVideo);
      ffmpegCommand.input(videoPath).inputOptions("-t " + timeFromEach);
    });

    await new Promise((resolve, reject) => {
      ffmpegCommand
        .videoCodec("libx264")
        .on("error", (error) => {
          console.error("Error editing videos: " + error);
          reject(new Error("Error editing videos"));
        })
        .on("start", () => {
          console.log("Starting merge");
        })
        .on("end", () => {
          console.log("Merged successfully!");
          resolve();
        })
        .mergeToFile(mergeVideosPath, "-c:a copy");
    }).catch((error) => {
      console.error(error);
      throw new Error("Failed to merge videos");
    });

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(mergeVideosPath)
        .input(audioPath)
        .input(subtitlesPath)
        .audioCodec("aac")
        .outputOptions("-shortest")
        .outputOptions(
          "-vf subtitles=./downloads/video/generatedVideo/subtitles.srt"
        )
        .output(tempVideoPath)
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

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(tempVideoPath)
        .input(musicPath)
        .complexFilter("[0:a] [1:a] amix=inputs=2:duration=shortest")
        .videoCodec("copy")
        .audioCodec("aac")
        .outputOptions("-shortest")
        .output(finalVideoPath)
        .on("error", (error) => {
          console.error("Error adding audio overlay: " + error);
          reject(error);
        })
        .on("end", () => {
          console.log("Music overlay added successfully!");
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

const removeAudioStream = async (inputFilePath, index) => {
  return new Promise((resolve, reject) => {
    // Check if the input file contains an audio stream
    ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }

      const hasAudio = metadata.streams.some(
        (stream) => stream.codec_type === "audio"
      );

      // If the input file has audio, remove it; otherwise, resolve immediately
      if (hasAudio) {
        const tempFilePath = path.join(rawVideosFolder, `temp${index}.mp4`);
        ffmpeg()
          .input(inputFilePath)
          .outputOptions("-c", "copy", "-an")
          .output(tempFilePath)
          .on("end", async () => {
            console.log(`Audio removed successfully from ${inputFilePath}`);

            try {
              // Delete the old file and rename the new
              await unlinkAsync(inputFilePath);
              fs.renameSync(tempFilePath, inputFilePath);
              console.log(`Original file ${inputFilePath} updated.`);
              resolve();
            } catch (error) {
              console.error(
                `Error updating original file ${inputFilePath}:`,
                error
              );
              reject(error);
            }
          })
          .on("error", (error) => {
            console.error(`Error removing audio from ${inputFilePath}:`, error);
            reject(error);
          })
          .run();
      } else {
        resolve();
      }
    });
  });
};

const resizeVideo = async (inputFilePath, index) => {
  return new Promise((resolve, reject) => {
    // Check if the input file need scaling
    ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }

      // Extract video dimensions
      const videoStream = metadata.streams.find(
        (stream) => stream.codec_type === "video"
      );
      if (!videoStream) {
        throw new Error(`Error: No video stream found in ${inputFilePath}`);
      }

      const { width, height } = videoStream;

      // Resize the file if needed ; otherwise, resolve immediately
      if (width !== 960 || height !== 540) {
        const tempFilePath = path.join(rawVideosFolder, `temp${index}.mp4`);
        ffmpeg()
          .input(inputFilePath)
          .outputOptions("-vf", `scale=960:540`)
          .output(tempFilePath)
          .on("end", async () => {
            console.log(`Resized successfully video ${inputFilePath}`);

            try {
              // Delete the old file and rename the new
              await unlinkAsync(inputFilePath);
              fs.renameSync(tempFilePath, inputFilePath);
              console.log(`Original file ${inputFilePath} updated.`);
              resolve();
            } catch (error) {
              console.error(
                `Error updating original file ${inputFilePath}:`,
                error
              );
              reject(error);
            }
          })
          .on("error", (error) => {
            console.error(`Error resize video: ${inputFilePath}:`, error);
            reject(error);
          })
          .run();
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getFileDuration,
  createVideo,
};
