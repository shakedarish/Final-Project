import { voices } from "./constData";

const isLocalhost = () => {
  return window.location.hostname === "localhost";
};
const serverBaseURL = isLocalhost()
  ? "http://localhost:3003"
  : "https://vidwizardser.onrender.com";
console.log("server url: " + serverBaseURL);

const API_URL = serverBaseURL + "/completion";
const VIDEO_URL = serverBaseURL + "/createVideo";
const SEND_EMAIL_URL = serverBaseURL + "/sendEmail";
const LOGIN_URL = serverBaseURL + "/login";
const SIGNUP_URL = serverBaseURL + "/sign";

const chatCompletionRequest = async (requestData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Chat complition response was not ok");
    }

    const responseData = await response.json();
    if (!responseData.success) {
      console.log("no success");
      return null;
    }
    return responseData.message;
  } catch (error) {
    console.error("Error making API call for chatComplition", error);
    return null;
  }
};

const editScript = async (requestData) => {
  const responseText = await chatCompletionRequest(requestData);
  return responseText;
};

const getScript = async (requestData) => {
  const responseText = await chatCompletionRequest(requestData);
  if (
    responseText.toLowerCase() === "unable to create" ||
    responseText.toLowerCase() === "content_filter"
  ) {
    return responseText;
  }
  const scenes = responseText
    .split("scenesText: ")
    .map((scene) => scene.trim())
    .filter(Boolean);

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

  return adjustedScript;
};

/*sending emil with Gmail service andn return success or not */
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
    const filename = responseData.message;
    console.log(`From utils, file name: ${filename}`);
    return filename;
  } catch (error) {
    console.error("Error making API call in generateVideo:", error);
    return null;
  }
};

const checkLogin = async ({ email, password }) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      return null;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error making API call for login", error);
    return null;
  }
};

const checkSignUp = async ({ email, password, userName }) => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        userName,
      }),
    });

    if (!response.ok) {
      return null;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error making API call for sign up", error);
    return null;
  }
};

export {
  generateVideo,
  getScript,
  editScript,
  sendEmil,
  checkLogin,
  checkSignUp,
  serverBaseURL,
};
