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
    const NewVideo = path.join(generatedVideoFolder, "NewVideo.mp4");

    const subtitlesPath = path.join(generatedVideoFolder, "subtitles.srt");
    const MusicPath = path.join(generatedVideoFolder, "exampleMusic.mp3");
    // const outputWavPath = path.join(ttsFolder, "new.wav");

    // const rawVideos = await fs.promises.readdir(rawVideosFolder);
    const rawVideos = (await fs.promises.readdir(rawVideosFolder)).filter(
      (file) => path.extname(file) === ".mp4"
    );
    const removeAudioPromises = [];

    // Iterate through each video file
    rawVideos.forEach((rawVideo, index) => {
      const videoPath = path.join(rawVideosFolder, rawVideo);
      removeAudioPromises.push(removeAudioStream(videoPath, index));
    });

    await Promise.all(removeAudioPromises);
    console.log("All videos are clear form audio stream");

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
          reject(new Error("Error editing videos")); // Reject with Error to ensure catch can handle it
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
      throw new Error("Failed to merge videos"); // Throw to ensure outer catch block catches this
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
          "-vf subtitles=./downloads/video/generatedVideo/subtitles.srt"
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

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(finalVideoPath)
        .input(MusicPath) // Background music (new)
        .complexFilter("[0:a] [1:a] amix=inputs=2:duration=shortest")
        .videoCodec("copy")
        .audioCodec("aac")
        .outputOptions("-shortest")
        .output(NewVideo)
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

module.exports = {
  getFileDuration,
  createVideo,
};
