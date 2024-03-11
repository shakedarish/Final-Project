const { searchVideo, downloadVideo } = require("./videoActions");

const generateVideo = async (req, res) => {
  try {
    //search for videos

    // const searchPromises = [];
    // const queryParameters = ["running", "cycling", "swimming", "gym"];

    // for (const queryParam of queryParameters) {
    //   const searchPromise = searchVideo(queryParam, 10);
    //   searchPromises.push(searchPromise);
    // }

    // const searchResults = await Promise.all(searchPromises);
    // const validResults = searchResults.filter(
    //   (result) => result !== null && result !== undefined
    // );
    // console.info("searchResult:", validResults.join(", "));

    // res.json({ success: true, searchResults });
    // download videos
    const testUrl1 =
      "https://player.vimeo.com/progressive_redirect/playback/368484050/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e96dc6af4eba7c7b7cce456b1de999f4d99264fd47dbde9793d62050ebc5b3e6";
    const testUrl2 =
      "https://player.vimeo.com/progressive_redirect/playback/428942994/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=528c8a9bb03ea207a1bb81e930ed93b87e3940266d6cdedbb0154ee148121ab1";
    const testUrl3 =
      "https://player.vimeo.com/progressive_redirect/playback/189533941/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=589e4f3f563177f1dc4449a866bffb438208045cf384347696121f9a53985bc7";
    const testUrl4 =
      "https://player.vimeo.com/progressive_redirect/playback/214459832/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=1b6a5b03702a59f61c6268c1e323bbb0bed0c10cb318a9c15080294630f6ae9e";

    const downloadTest = await downloadVideo(testUrl1, "1");
    res.json({ success: true, downloadTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in Generate Video" });
  }
};

module.exports = {
  generateVideo,
};
