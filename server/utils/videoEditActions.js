const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

// Set paths for ffmpeg binaries
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// Define paths for various resources
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

// Function to remove audio from video files asynchronously
const removeAudioStream = async (inputFilePath, index) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }
      const hasAudio = metadata.streams.some(
        (stream) => stream.codec_type === "audio"
      );
      if (!hasAudio) {
        resolve();
        return;
      }
      const tempFilePath = path.join(rawVideosFolder, `temp${index}.mp4`);
      ffmpeg()
        .input(inputFilePath)
        .outputOptions("-c", "copy", "-an")
        .output(tempFilePath)
        .on("end", async () => {
          try {
            await unlinkAsync(inputFilePath);
            fs.renameSync(tempFilePath, inputFilePath);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on("error", reject)
        .run();
    });
  });
};

// Main video creation function
const createVideo = async (timeFromEach) => {
  try {
    const rawVideos = (await fs.promises.readdir(rawVideosFolder)).filter(
      (file) => path.extname(file) === ".mp4"
    );

    // Remove audio from all videos in parallel
    await Promise.all(
      rawVideos.map((file, index) =>
        removeAudioStream(path.join(rawVideosFolder, file), index)
      )
    );
    console.log("All videos are clear from audio stream");

    // Paths for final video and intermediate files
    const audioPath = path.join(ttsFolder, "tts.mp3");
    const mergeVideosPath = path.join(generatedVideoFolder, "mergeVideos.mp4");
    const finalVideoPath = path.join(generatedVideoFolder, "finalVideo.mp4");
    const subtitlesPath = path.join(generatedVideoFolder, "subtitles.srt");
    const MusicPath = path.join(generatedVideoFolder, "exampleMusic.mp3");

    // Merge all video files
    const ffmpegCommand = ffmpeg();
    rawVideos.forEach((video) => {
      ffmpegCommand
        .input(path.join(rawVideosFolder, video))
        .inputOptions("-t " + timeFromEach);
    });

    await new Promise((resolve, reject) => {
      ffmpegCommand
        .videoCodec("libx264")
        .on("error", reject)
        .on("end", resolve)
        .mergeToFile(mergeVideosPath, "-c:a copy");
    });

    // Add audio and subtitles
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
        .output(finalVideoPath)
        .on("error", reject)
        .on("end", resolve)
        .run();
    });

    // Add background music
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(finalVideoPath)
        .input(MusicPath)
        .complexFilter("[0:a][1:a]amix=inputs=2:duration=shortest")
        .videoCodec("copy")
        .audioCodec("aac")
        .outputOptions("-shortest")
        .output(finalVideoPath.replace(".mp4", "_final.mp4")) // Output to a new file
        .on("error", reject)
        .on("end", resolve)
        .run();
    });

    console.log("Video processing completed successfully.");
    return finalVideoPath.replace(".mp4", "_final.mp4"); // Return the path of the final video
  } catch (error) {
    console.error("Error during video processing:", error);
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
