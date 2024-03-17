const { promises: fsPromises } = require("fs");
require("dotenv").config();

const azureTtsApi = async (text, voice) => {
  console.info("generate tts using azure");
  const ttsUrl = process.env.TTS_URL;
  const ttsKey = process.env.TTS_API_KEY;

  const headers = {
    "Content-Type": "application/ssml+xml",
    "Ocp-Apim-Subscription-Key": ttsKey,
    "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
    "User-Agent": "curl",
  };

  const ssmlContent = `
      <speak version='1.0' xml:lang='en-US'>
        <voice xml:lang='en-US' name='${voice}'>
          ${text}
        </voice>
      </speak>
    `;
  try {
    const response = await fetch(ttsUrl, {
      method: "POST",
      headers: headers,
      body: ssmlContent,
    });

    if (!response.ok) {
      console.error(
        `Error gererate tts, response status: ${response.status}, error: `,
        response.statusText
      );
      return null;
    }

    const audioBuffer = await response.arrayBuffer();
    const filePath = "downloads/tts/tts.mp3";

    await fsPromises.writeFile(filePath, Buffer.from(audioBuffer));
    return filePath;
  } catch (error) {
    console.error(`Error gererate tts: `, error);
    return null;
  }
};

module.exports = {
  azureTtsApi,
};
