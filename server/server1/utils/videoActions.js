const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

/* search for video with the givan query, return video url or null */
const searchVideo = async (query, minDuration) => {
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
      (video) => video.duration >= minDuration
    );

    if (filteredVideos.length === 0) {
      console.warn(
        `No videos found with duration >= ${minDuration} seconds for query: ${query}`
      );
      return null;
    }

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
    console.error("Error in searchAndDownloadVideo:", error.message);
    throw new Error("Error in searchAndDownloadVideo", error);
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

module.exports = {
  searchVideo,
  downloadVideo,
};
