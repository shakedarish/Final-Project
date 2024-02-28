const express = require("express");
const cors = require("cors");
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

require("dotenv").config();
const apiKey = process.env.GPT_API_KEY;

app.post("/completions", async (req, res) => {
  //4 sec sleep
  await (async () => {
    console.log("Start");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log("End");
  })();

  console.log("returning test response , no api call made!");
  res.json("I am test text you got back!");
  // try {
  //   const message = req.body.message;
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: "user", content: message }],
  //       max_tokens: 100,
  //     }),
  //   };
  //   const response = await fetch(
  //     "https://api.openai.com/v1/chat/completions",
  //     options
  //   );
  //   const data = await response.json();
  ////   res.json(data);
  //   res.json(data.choices[0].message.content);
  // } catch (error) {
  //   console.error("Error generating completion:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }

  //videos.push(newVideo);
  // res.status(201).json(newVideo);
  // } else {
  //   res.status(400).json({ error: 'Invalid request, please provide data in the request body.' });
});

app.post("/tts", async (req, res) => {
  console.log("tts start");
  const textToSpeak = req.body.text;
  const voiceName = req.body.voice;

  try {
    const audioBuffer = await generateTextToSpeech(textToSpeak, voiceName);
    const audioBase64 = audioBuffer.toString("base64");
    res.json({ audioBase64 });
    // res.setHeader("Content-Type", "audio/mpeg");
    // console.log(audioBuffer);
    // res.send(audioBuffer);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function generateTextToSpeech(text, voiceName) {
  const url =
    "https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1";
  const ttsKey = "9b601e0af2fc4d28978f51c8cc806131";

  const headers = {
    "Content-Type": "application/ssml+xml",
    "Ocp-Apim-Subscription-Key": ttsKey,
    "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
    "User-Agent": "curl",
  };

  const ssmlContent = `
    <speak version='1.0' xml:lang='en-US'>
      <voice xml:lang='en-US' name='${voiceName}'>
        ${text}
      </voice>
    </speak>
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: ssmlContent,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const audioBuffer = await response.arrayBuffer();
  return Buffer.from(audioBuffer);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
