const { searchVideo, downloadVideo } = require("./videoActions");
const { getFileDuration, createVideo } = require("./videoEditActions");
const { azureTtsApi } = require("./ttsActions");

const generateVideo = async (req, res) => {
  const textToSpeak = req.body.text;
  const voiceName = req.body.voice;

  console.info(req.body);
  if (textToSpeak == null || voiceName == null) {
    console.error("text and voice cant be empty");
    res
      .status(500)
      .json({ success: false, message: "text and voice cant be empty" });
  }

  try {
    /* generate tts*/
    const ttsGenerated = await azureTtsApi(textToSpeak, voiceName);
    if (ttsGenerated == null) {
      res.status(500).json({
        success: false,
        message: "error while gereate text to speech",
      });
    }
    /* tts duration logic */
    const fileInfo = await getFileDuration("downloads/tts/tts.mp3");
    console.info("tts duaration: " + fileInfo.duration);
    // tts = 40s
    // number of videos = 40s / 7s
    const oneVideoDuration = 7;
    /* serach for videos */
    const queryParameters = [
      "Sport montage",
      "Athletics in action",
      "Fitness training scenes",
      "Running shoes, tennis racket",
      "Sports victory celebrations",
      "Inspirational sport",
    ];
    const rawVideosUrl = await videosSearcher(
      queryParameters,
      oneVideoDuration
    );

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
      const errorMessage = "error while creating the video";
      res.json({ success: false, message: errorMessage });
    }
    console.info("finalVideoUrl: " + finalVideoUrl);

    /**
     *
     *
     *
     *
     * todo - add file delete after we have the final video
     *
     *
     *
     *
     */

    res.status(200).json({ success: true, message: finalVideoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in Generate Video" });
  }
};

const videosSearcher = async (queryParameters, minDuration) => {
  const searchPromises = [];
  for (const queryParam of queryParameters) {
    const searchPromise = searchVideo(queryParam, minDuration);
    searchPromises.push(searchPromise);
  }

  const searchResults = await Promise.all(searchPromises);
  const validResults = searchResults.filter(
    (result) => result !== null && result !== undefined
  );
  console.info("video search result:\n", validResults.join("\n"));
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
