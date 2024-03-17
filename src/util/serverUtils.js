import { voices } from "./constData";

const API_URL = "http://localhost:3003/completions";
const VIDEO_URL = "http://localhost:3003/createVideo";

export const getScript = async (requestData) => {
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

// export const videoTest = async () => {
//   try {
//     const response = await fetch(VIDEO_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error("Error making API call:", error);
//     throw error;
//   }
// };

export { generateVideo };
