const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const videoEdit = require("./videoEdit");

const generateVideo = async (req, res) => {
  try {
    // const searchPromises = [];
    // const queryParameters = ["running", "cycling", "swimming"];

    // for (const queryParam of queryParameters) {
    //   const searchPromise = searchVideo(queryParam);
    //   searchPromises.push(searchPromise);
    // }

    // const searchResults = await Promise.all(searchPromises);

    const testUrl1 =
      "https://player.vimeo.com/progressive_redirect/playback/368484050/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e96dc6af4eba7c7b7cce456b1de999f4d99264fd47dbde9793d62050ebc5b3e6";

    const testUrl2 =
      "https://player.vimeo.com/progressive_redirect/playback/428942994/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=528c8a9bb03ea207a1bb81e930ed93b87e3940266d6cdedbb0154ee148121ab1";
    // const testDownlowd = await downloadVideo(testUrl2, "video2");
    videoEdit.merge();
    // res.status(200).json(searchResults);
    // res.status(200).json(testDownlowd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function searchVideo(query) {
  console.info("pexels video search for query: " + query);
  const url = `https://api.pexels.com/videos/search?query=${query}&per_page=1`;
  const pexelsKey = process.env.PEXELS_API_KEY;

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

    const videoUrl = data.videos[0].video_files[0].link;

    return videoUrl;
  } catch (error) {
    console.error("Error in searchAndDownloadVideo:", error.message);
    throw new Error("Error in searchAndDownloadVideo", error);
  }
}

async function downloadVideo(videoUrl, videoName) {
  const downloadFolder = path.join(__dirname, "downloadedVideos");
  const outputPath = path.join(downloadFolder, `${videoName}.mp4`);

  downloadFile(videoUrl, outputPath)
    .then(() => console.log(`File downloaded and saved to: ${outputPath}`))
    .catch((error) => console.error("Error downloading file:", error));

  return "saved";
}

function downloadFile(url, outputPath) {
  const protocol = url.startsWith("https") ? https : http;

  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(outputPath);

    protocol
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // Handle redirection
          downloadFile(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download file. Status Code: ${response.statusCode}`
            )
          );
          return;
        }

        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(outputPath, () => reject(err)); // Delete the file if an error occurs
        });
      })
      .on("error", (err) => {
        fs.unlink(outputPath, () => reject(err)); // Delete the file if an error occurs
      });
  });
}

module.exports = {
  generateVideo,
};
