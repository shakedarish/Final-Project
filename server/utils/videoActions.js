const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
require("dotenv").config();

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

/* search for video with the givan keywords array, return video url or null if both faild */
const getVideoUrl = async (keywords, minDuration) => {
  let url = await pexelsSearchVideo(keywords[0], minDuration);
  if (url == null) {
    const backupUrl = await pexelsSearchVideo(keywords[1], minDuration);
    if (backupUrl == null) {
      return null;
    }
    url = backupUrl;
  }
  return url;
};

/* search for video with the givan query, return video url or null */
const pexelsSearchVideo = async (query, minDuration) => {
  console.info("pexels video search for query: " + query);
  const pexelsKey = process.env.PEXELS_API_KEY;
  const baseUrl = process.env.PEXELS_BASE_URL;
  const url = baseUrl + `?query=${query}&orientation=landscape&per_page=10`;

  const headers = {
    Authorization: pexelsKey,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(
        `Pexels search video request failed for queery ${query} with status: ${response.status}`
      );
    }

    const data = await response.json();
    if (data.videos.length === 0) {
      console.warn(`No results found for query: ${query}`);
      return null;
    }

    const filteredVideos = data.videos.filter(
      (video) => video.duration >= minDuration && video.duration < 40
    );

    if (filteredVideos.length === 0) {
      console.warn(
        `No videos found with duration >= ${minDuration} seconds for query: ${query}`
      );
      return null;
    }
    /**
     *
     * Todo
     * Try to make it so we don't need excat width height
     *
     *
     */
    for (const video of filteredVideos) {
      const selectedVideoUrl = video.video_files.find(
        (file) => file.width === 960 && file.height === 540
      )?.link;

      if (selectedVideoUrl) {
        return selectedVideoUrl;
      }
    }
    console.warn(`No videos found for query: ${query}`);
    return null;
  } catch (error) {
    console.error("Error in searchAndDownloadVideo: ", error.message);
    return null;
  }
};

/* download video from url and save is as videoName in /downloads/video/rawVideos */
const downloadVideo = async (videoUrl, videoName) => {
  const downloadFolder = path.join(
    __dirname,
    "..",
    "downloads",
    "video",
    "rawVideos"
  );
  const outputPath = path.join(downloadFolder, `${videoName}.mp4`);
  try {
    await downloadFile(videoUrl, outputPath);
    console.info(`Video downloaded and saved to: ${outputPath}`);
    return true;
  } catch (error) {
    console.error("Error downloading file:", error);
    return false;
  }
};

const downloadFile = async (url, outputPath) => {
  const protocol = url.startsWith("https") ? https : http;
  const fileStream = fs.createWriteStream(outputPath);
  return new Promise((resolve, reject) => {
    protocol
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          response.resume();
          downloadFile(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
        } else if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download file. Status Code: ${response.statusCode}`
            )
          );
        } else {
          response.pipe(fileStream);

          fileStream.on("finish", () => {
            fileStream.close();
            resolve();
          });

          fileStream.on("error", (err) => {
            fs.unlink(outputPath, () => reject(err));
          });
        }
      })
      .on("error", (err) => {
        fs.unlink(outputPath, () => reject(err));
      });
  });
};

const deleteData = async () => {
  const rawFilesNames = await fs.promises.readdir(rawVideosFolder);
  const mp3File = path.join(ttsFolder, "tts.mp3");
  const wavFile = path.join(ttsFolder, "new.wav");
  const mergedVideosFile = path.join(generatedVideoFolder, "mergeVideos.mp4");
  const tempVideosFile = path.join(generatedVideoFolder, "tempVideo.mp4");
  const subtitlesFile = path.join(generatedVideoFolder, "subtitles.srt");

  const toDelete = rawFilesNames.map((filename) =>
    path.join(rawVideosFolder, filename)
  );

  toDelete.push(
    mp3File,
    wavFile,
    mergedVideosFile,
    subtitlesFile,
    tempVideosFile
  );

  for (const item of toDelete) {
    try {
      await unlinkAsync(item);
    } catch (error) {
      console.error(`Error deleting file ${item}:`, error);
    }
  }
};

module.exports = {
  getVideoUrl,
  downloadVideo,
  deleteData,
};
