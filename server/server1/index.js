const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 3003;
const videoController = require("./utils/videoController");
const emailController = require("./utils/emailController");

app.use(cors());
app.use(express.json());

require("dotenv").config();
const gptKey = process.env.GPT_API_KEY;

app.post("/completions", async (req, res) => {
  //4 sec sleep
  await (async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
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

/* email */
app.post("/sendEmail", async (req, res) => {
  try {
    emailController.sendEmil(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in createVideo" });
  }
});

/* video */
app.post("/createVideo", async (req, res) => {
  try {
    videoController.generateVideo(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in createVideo" });
  }
});

/* static file directory for client */
const relativePath = "/downloads/video/generatedVideo";
const staticFilesDirectory = path.join(
  __dirname,
  "downloads",
  "video",
  "generatedVideo"
);
console.info("Static file directory: " + staticFilesDirectory);

app.use(relativePath, express.static(staticFilesDirectory));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
