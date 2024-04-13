const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 3003;
const videoController = require("./utils/videoController");
const emailController = require("./utils/emailController");
const llmController = require("./utils/llmController");

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("<h1>Server is up and running</h1>");
});

app.post("/completions", async (req, res) => {
  // 4 sec sleep
  await (async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
  })();
  try {
    llmController.llmChatCompletion(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in createVideo" });
  }
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
  // 8 sec sleep
  await (async () => {
    await new Promise((resolve) => setTimeout(resolve, 8000));
  })();
  const dummyUrl =
    "http://localhost:3003/downloads/video/generatedVideo/finalVideo.mp4";
  console.log("Dummy create video, return url: " + dummyUrl);
  res.send({ success: true, message: dummyUrl });
  // try {
  //   videoController.generateVideo(req, res);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal Server Error in createVideo" });
  // }
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
