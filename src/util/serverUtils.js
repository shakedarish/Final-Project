import { voices } from "./constData";

const API_URL = "http://localhost:3003/completions";
const VIDEO_URL = "http://localhost:3003/createVideo";
const SEND_EMAIL_URL = "http://localhost:3003/sendEmail";
const SYNC_SUB_URL = "http://localhost:3003/syncSub";

const getScript = async (requestData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData);
    if (!responseData.success) {
      console.log("no success");
      return null;
    }
    const responseText = responseData.message;

    const scenes = responseText.split("scenesText: ").filter(Boolean);

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Adjust the pattern for each scene
    const adjustedScenes = scenes.map((scene, index) => {
      const sceneNumber = index + 1;
      const sceneHeader = `Scene ${sceneNumber}:\n`;
      const adjustedScene = `${sceneHeader}${capitalizeFirstLetter(
        scene.trim()
      )}`;
      return adjustedScene;
    });

    // Join the adjusted scenes with a newline
    const adjustedScript = adjustedScenes.join("\n\n");

    console.log(adjustedScript);

    return adjustedScript;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
};

const sendEmil = async (requestData) => {
  try {
    const response = await fetch(SEND_EMAIL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      return null;
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData.success;
  } catch (error) {
    console.error("Error making API call for send email", error);
    return null;
  }
};

/* get the script and voice setting and return the final generated video url */
const generateVideo = async ({ text, voiceIndex }) => {
  try {
    const response = await fetch(VIDEO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voice: voices[voiceIndex].fullName,
        text,
      }),
    });

    if (!response.ok) {
      return null;
    }
    const responseData = await response.json();

    if (!responseData.success || !responseData.message.trim()) {
      return null;
    }
    return responseData.message;
  } catch (error) {
    console.error("Error making API call in generateVideo:", error);
    return null;
  }
};

const getTranscriptionWithTimestamps = async (text) => {
  try {
    const response = await fetch(SYNC_SUB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(
        "Network response was not ok in getTranscriptionWithTimestamps"
      );
    }

    const responseData = await response.json();
    if (!responseData.success) {
      console.log("Failed to get transcription with timestamps");
      return null;
    }
    console.log("Transcription with Timestamps:", responseData.data);
    return responseData.data;
  } catch (error) {
    console.error("Error in getTranscriptionWithTimestamps:", error);
    return null;
  }
};

export { generateVideo, getScript, sendEmil, getTranscriptionWithTimestamps };
