import { voices } from "./constData";

const API_URL = "http://localhost:3003/completions";
const VIDEO_URL = "http://localhost:3003/createVideo";
const SEND_EMAIL_URL = "http://localhost:3003/sendEmail";

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
    return responseData;
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
    return responseData;
  } catch (error) {
    console.error("Error making API call in generateVideo:", error);
    return null;
  }
};

export { generateVideo, getScript, sendEmil };
