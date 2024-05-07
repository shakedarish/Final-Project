const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const videoController = require("./utils/videoController");
const emailController = require("./utils/emailController");
const llmController = require("./utils/llmController");
const dbController = require("./utils/dbController");

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

app.post("/sign", async (req, res) => {
  try {
    dbController.uploadData(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in sign" });
  }
});

app.post("/login", async (req, res) => {
  try {
    dbController.checkLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error in login" });
  }
});

/* chat completion for generate script */
app.post("/completion", async (req, res) => {
  try {
    llmController.llmLogic(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error in completion" });
  }
});

/* email */
app.post("/sendEmail", async (req, res) => {
  try {
    emailController.sendEmil(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error in createVideo" });
  }
});

/* video */
app.post("/createVideo", async (req, res) => {
  try {
    videoController.generateVideo(req, res);
  } catch (error) {
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

app.use(relativePath, express.static(staticFilesDirectory));

module.exports = app;
