const { getVideoUrl, downloadVideo, deleteData } = require("./videoActions");
const { getFileDuration, createVideo } = require("./videoEditActions");
const { azureTtsApi } = require("./ttsActions");
const { generateSubtitlesFile } = require("./subSync.js");
const { getSearchKeywords } = require("./llmController.js");

const generateVideo = async (req, res) => {
  const rawText = req.body.text;
  const voiceName = req.body.voice;
  // text for search for keywords api call
  const textForKeywords = rawText.replace(/\n/g, "");
  // text to speech
  const textToSpeech = textForKeywords.replace(/scene \d+:/gi, "").trim();

  if (textToSpeech == null || voiceName == null) {
    console.error("text and voice cant be empty");
    res
      .status(500)
      .json({ success: false, message: "text and voice cant be empty" });
  }

  try {
    /* --- Create Video Flow --- */

    /* generate tts*/
    const ttsGenerated = await azureTtsApi(textToSpeech, voiceName);
    if (ttsGenerated == null) {
      res.status(500).json({
        success: false,
        message: "error while gereate text to speech",
      });
    }

    /* create subtitles file*/
    await generateSubtitlesFile();

    /* get search keywords per scese using llm */
    const keywordsString = await getSearchKeywords(textForKeywords);
    if (keywordsString == null) {
      console.error(`Error in get keywords using completion`);
      res.status(500).json({
        success: false,
        message: "Error in get keywords",
      });
    }
    const keywords = getKeywordsArray(keywordsString);

    /* tts duration logic */
    const fileInfo = await getFileDuration("downloads/tts/tts.mp3");
    console.info("tts duration: " + fileInfo.duration);
    const oneVideoDuration = Math.ceil(fileInfo.duration / keywords.length);
    console.info("One video duration: " + oneVideoDuration);

    /* Search for videos */
    const rawVideosUrl = await videosSearcher(keywords, oneVideoDuration);
    if (rawVideosUrl == null) {
      const errorMessage = "Error in get videos url from search";
      console.error(errorMessage);
      res.json({ success: false, message: errorMessage });
    }

    /* Download raw videos */
    const rawVideosDownloaded = await videosDownloader(rawVideosUrl);
    if (rawVideosDownloaded == null) {
      const errorMessage = "error in video download";
      console.error(errorMessage);
      res.json({ success: false, message: errorMessage });
    }

    /* Merge videos with tts */
    const finalVideoUrl = await createVideo(oneVideoDuration);
    if (finalVideoUrl == null) {
      const errorMessage = "Error while creating the final video";
      res.json({ success: false, message: errorMessage });
    }
    console.info("finalVideoUrl: " + finalVideoUrl);

    res.status(200).json({ success: true, message: finalVideoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in Generate Video" });
  } finally {
    deleteData()
      .then(() => {
        console.info("Data deleted succsfully");
      })
      .catch((error) => {
        console.error("Error on deleting data " + error.message);
      });
  }
};

const getKeywordsArray = (inputString) => {
  const pairs = inputString.slice(1, -1).split("];[");
  const resultArray = [];

  pairs.forEach((pair) => {
    const values = pair.replace(/\[|\]/g, "").split(", ");
    resultArray.push(values);
  });

  return resultArray;
};

const videosSearcher = async (keywordsArray, minDuration) => {
  const searchPromises = [];
  for (const keywords of keywordsArray) {
    const searchPromise = getVideoUrl(keywords, minDuration);
    searchPromises.push(searchPromise);
  }

  const searchResults = await Promise.all(searchPromises);
  const validResults = searchResults.filter(
    (result) => result !== null && result !== undefined
  );
  if (validResults.length != searchResults.length) {
    return null;
  }
  return validResults;
};

const videosDownloader = async (videoUrls) => {
  let success = true;
  const downloadPromises = videoUrls.map(async (videoUrl, index) => {
    const videoName = (index + 1).toString();
    const downloadResult = await downloadVideo(videoUrl, videoName);
    if (!downloadResult) {
      success = false;
      console.error(`Error downloading video ${videoName}:`, error);
    }
  });

  await Promise.all(downloadPromises);

  if (success) {
    console.info("All videos downloaded successfully.");
    return true;
  } else {
    console.error("One or more videos failed to download.");
    return null;
  }
};

module.exports = {
  generateVideo,
};
