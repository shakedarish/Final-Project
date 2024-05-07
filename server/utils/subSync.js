const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const audiobefor = "./downloads/tts/tts.mp3";
const audioFilename = "./downloads/tts/new.wav";
const outputFilename = "./downloads/video/generatedVideo/subtitles.srt";

const tickToMilliseconds = (ticks) => ticks / 10000;
const formatTime = (milliseconds) => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")},${ms
    .toString()
    .padStart(3, "0")}`;
};

const generateSubtitlesFile = async () => {
  await convertMp3ToWav(audiobefor, audioFilename);
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION
  );
  speechConfig.speechRecognitionLanguage = "en-US";
  speechConfig.requestWordLevelTimestamps();
  speechConfig.outputFormat = sdk.OutputFormat.Detailed;

  const audioConfig = sdk.AudioConfig.fromWavFileInput(
    fs.readFileSync(audioFilename)
  );
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  let sentences = [];
  let lastEndTime = 0;
  return new Promise((resolve, reject) => {
    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        const result = JSON.parse(e.result.json).NBest[0];
        const words = result.Words;
        const transcript = result.Display;

        // Split transcript into sentences
        const rawSentences = transcript.split(/\. +/);
        rawSentences.forEach((sentence) => {
          if (!sentence.trim()) return;

          const sentenceWords = sentence.trim().split(/\s+/);
          let startTime = lastEndTime + 10;
          let endTime = startTime;

          sentenceWords.forEach((word) => {
            const wordDetail = words.find(
              (w) => w.Word.toLowerCase() === word.toLowerCase()
            );
            if (wordDetail) {
              const wordEndTime = tickToMilliseconds(
                wordDetail.Offset + wordDetail.Duration
              );
              if (wordEndTime > endTime) {
                endTime = wordEndTime;
              }
            }
          });
          lastEndTime = endTime;
          if (startTime !== Infinity && endTime !== 0) {
            sentences.push({
              text: sentence + ".",
              startTime,
              endTime,
            });
          }
        });
      }
    };

    recognizer.sessionStopped = (s, e) => {
      recognizer.stopContinuousRecognitionAsync();
      resolve(sentences);
    };

    recognizer.canceled = (s, e) => {
      if (e.reason === sdk.CancellationReason.Error) {
        console.log("Error in recognition.");
        reject("Recognition canceled due to error.");
      } else {
        resolve(sentences);
      }
    };

    recognizer.startContinuousRecognitionAsync(
      () => console.log("Recognition started"),
      (err) => reject(`Error starting recognition: ${err}`)
    );
  }).then((sentences) => {
    const formattedText = sentences
      .map(
        (sentence, index) =>
          `${index + 1}\n${formatTime(sentence.startTime)} --> ${formatTime(
            sentence.endTime
          )}\n${sentence.text}\n`
      )
      .join("\n");

    fs.writeFileSync(outputFilename, formattedText, "utf-8");
    console.log("Subtitle file saved to", outputFilename);
  });
};

const convertMp3ToWav = async (audioPath, outputWavPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(audioPath)
      .outputFormat("wav")
      .audioCodec("pcm_s16le")
      .on("end", () => {
        console.log("Conversion from MP3 to WAV completed successfully.");
        resolve(outputWavPath);
      })
      .on("error", (err) => {
        console.error("Error converting MP3 to WAV:", err);
        reject(err);
      })
      .save(outputWavPath);
  });
};

module.exports = { generateSubtitlesFile };
