require("dotenv").config();

const llmChatCompletion = async (req, res) => {
  const openAIKey = process.env.OPEN_AI_KEY;
  const baseUrl = process.env.OPEN_AI_BASE_URL;
  const openAIModel = process.env.OPEN_AI_MODEL;

  const reqText = req.body.text;

  const messages = [
    { role: "system", content: generatePrompt },
    { role: "user", content: reqText },
  ];

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openAIKey}`,
  };

  const requestBody = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      messages: messages,
      model: openAIModel,
    }),
  };

  res.status(200).json({ success: true, message: dummyGeneratedScript });

  //   try {
  //     const response = await fetch(baseUrl, requestBody);
  //     if (!response.ok) {
  //       throw new Error(
  //         `Chat Completion request failed for ${requestBody} with status: ${response.status}`
  //       );
  //     }

  //     const data = await response.json();
  //     const textResponse = data.choices[0]?.message?.content ?? "";

  //     if (!textResponse) {
  //       //handle case of empty resoult
  //       console.log("response was empty");
  //     }
  //     console.log("textResponse: " + textResponse);
  //     // res.status(200).json({ success: true, message: textResponse });
  //     res.json(data);
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .json({ error: "Internal Server Error in open AI chat completion" });
  //   }
};

const generatePrompt =
  'Act as though you are a video guru with over 20 years of experience creating and producing videos for any and all kinds of audiences. Your purpose and primary function is to produce a text script that will be used as the TTS in a 30-40 second video. Make sure to break up the script into sentences, or scenes, start each secene with that text: "scenesText:" and align it to one TTS speaker. Remember that the text you provide (after removing the "scenseText" token) will be use as the text for the TTS so do not add any prifix or othrt addition to it. The video should be about what the user will send you.';

const queryPronpt =
  'Act as though you are a video guru with over 20 years of experience creating and producing videos for any and all kinds of audiences. Your purpose and primary function is to provide a text query for an online video site called "pexels", the videos obtaine by each query will be served as the background for the scene text (each video is only 5-8 seconds long). Undestand the idea of the video and comeup with videos that make sense to be one after the other of this text. Make sure that each query is concise (no more than 2 or 3 words) , slightly different from the others, make the query is general and not to spesific and write it ss singular and not as  plural. For example: for a scenes: "Struggling to fall asleep? Let\'s start with a bedtime routine." a good query will be "bad sleep", for the opening scene: "Welcome to our guide for better sleep." something like "Calm nature" will be appropriate. return only the query value for each scene, sperate by ";" Here is the script:';

const dummyGeneratedScript =
  'scenesText: "Welcome to our guide for better sleep." scenesText: "Struggling to fall asleep? Let\'s start with a bedtime routine." scenesText: "Create a calming ritual before bed to signal your body it\'s time to wind down." scenesText: "Avoid caffeine and heavy meals close to bedtime. Opt for soothing herbal teas instead." scenesText: "Power down electronics an hour before bed to reduce blue light exposure." scenesText: "Incorporate gentle stretches to release tension and relax muscles." scenesText: "Finally, ensure your sleep environment is comfortable and conducive to rest." scenesText: "Follow these tips for a restful night\'s sleep. Sweet dreams!"';

const dummyQuery =
  "Calm nature; Bedtime routine; Calming ritual; Herbal tea; Power down; Gentle stretches; Comfortable environment; Restful sleep.";

module.exports = {
  llmChatCompletion,
};
