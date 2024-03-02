import { voices } from "./constData";

const API_URL = "http://localhost:3003/completions";
const TTS_API_URL = "http://localhost:3003/tts";

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

export const getTextToSpeech = async ({ index, text }) => {
  throw new Error(
    "The call to the server is no sending, active it in serverUtils.getTextToSpeech"
  );

  try {
    const response = await fetch(TTS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voice: voices[index].fullName,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    const audioBlob = b64toBlob(responseData.audioBase64, "audio/mpeg");
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  } catch (error) {
    console.error("Error making Text-to-Speech API call:", error);
    throw error;
  }
};

const b64toBlob = (b64Data, contentType) => {
  const byteCharacters = atob(b64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};
