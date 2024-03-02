const avaAudio = require("../res/voice/ava.mp3");
const andrewAudio = require("../res/voice/andrew.mp3");
const brianAudio = require("../res/voice/brian.mp3");
const emmaAudio = require("../res/voice/emma.mp3");

export const voices = [
  {
    id: 1,
    name: "Ava",
    gender: "Female",
    description: "Bright, engaging voice with a beautiful tone.",
    audioFile: avaAudio,
    fullName: "en-US-AvaNeural",
  },
  {
    id: 2,
    name: "Andrew",
    gender: "Male",
    description:
      "Warm, engaging voice that sounds like someone you want to know.",
    audioFile: andrewAudio,
    fullName: "en-US-AndrewNeural",
  },
  {
    id: 3,
    name: "Emma",
    gender: "Female",
    description:
      "Friendly, light-hearted, and pleasant voice that works well for education and explanations.",
    audioFile: emmaAudio,
    fullName: "en-US-EmmaNeural",
  },
  {
    id: 4,
    name: "Brian",
    gender: "Male",
    description:
      "Youthful, cheerful, and versatile voice well-suited to a wide variety of contexts.",
    audioFile: brianAudio,
    fullName: "en-US-BrianNeural",
  },
];
