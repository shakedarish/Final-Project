const express = require("express");
const cors = require("cors");
const app = express();
const port = 3003;
const nodemailer = require("nodemailer");
/* video */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const videoController = require("./videoController");

app.use(cors());
app.use(express.json());

require("dotenv").config();
const gptKey = process.env.GPT_API_KEY;

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
  //       Authorization: `Bearer ${gptKey}`,
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
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 456,
  secure: true,
  auth: {
    user: "shakedarish80@gmail.com",
    pass: "cpqb mdgc fajy xnby",
  },
});

app.post("/contact", async (req, res) => {
  const { firstName, lastName, company, email, phoneNumber, message } =
    req.body;

  const mail = {
    from: `${email} <${process.env.EMAIL_USER}>`,
    to: "shakedarish80@gmail.com",
    subject: "Contact you from application",
    html: `
    <p> Name: ${firstName} ${lastName}</p>
    <p> Company: ${company}</p>
    <p> Phone Number: ${phoneNumber}</p>
    <p> Message: ${message}</p>
    `,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      res.json({ status: "Message sent" });
    }
  });
});

/* tts */
app.post("/tts", async (req, res) => {
  console.log("tts start");
  const textToSpeak = req.body.text;
  const voiceName = req.body.voice;

  try {
    const audioBuffer = await generateTextToSpeech(textToSpeak, voiceName);
    const audioBase64 = audioBuffer.toString("base64");
    res.json({ audioBase64 });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function generateTextToSpeech(text, voice) {
  const url =
    "https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1";
  const ttsKey = process.env.TTS_API_KEY;
  console.log("ttsKey:" + ttsKey);

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

/* email */
app.post("/contact", async (req, res) => {
  const { firstName, lastName, company, email, phoneNumber, message } =
    req.body;

  const mail = {
    from: `${email} <${process.env.EMAIL_USER}>`,
    to: "shakedarish80@gmail.com",
    subject: "Contact you from application",
    html: `
    <p> Name: ${firstName} ${lastName}</p>
    <p> Company: ${company}</p>
    <p> Phone Number: ${phoneNumber}</p>
    <p> Message: ${message}</p>
    `,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      res.json({ status: "Message sent" });
    }
  });
});

/* video */
app.post("/createVideo", async (req, res) => {
  try {
    await videoController.generateVideo(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
