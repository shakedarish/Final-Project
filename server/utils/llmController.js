require("dotenv").config();
const { chatCompletion } = require("./llmAction");

const llmLogic = async (req, res) => {
  const { text, callType } = req.body;
  let systemContent = generatePrompt;
  if (callType === "edit") {
    systemContent = editPrompt;
    const originalScript = req.body.originalScript;
    systemContent = editPrompt.replace("{originalScript}", originalScript);
  }

  try {
    const llmResponse = await llmCall(systemContent, text);
    if (llmResponse === null) {
      return res.status(500).json({
        success: false,
        message: "error in chat complition",
      });
    }
    return res.status(200).json({ success: true, message: llmResponse });
  } catch (error) {
    console.error("Error in chat complition, error: " + error);
    res.status(500).json({
      success: false,
      message: "error in chat complition",
    });
  }
};

const getSearchQueries = async (text) => {
  try {
    return await llmCall(queryPronpt, text);
  } catch (error) {
    console.error("Error in chat getSearchQueries, error: " + error);
    return null;
  }
};

const llmCall = async (systemContent, text) => {
  try {
    const llmResponse = await chatCompletion(systemContent, text);
    return llmResponse;
  } catch (error) {
    console.error("Error in llmCall, error: " + error);
    return null;
  }
};

const generatePrompt =
  'As a video guru with over 20 years of experience in creating and producing videos for diverse audiences. Your purpose and primary function is to produce a text script that will be used as the voiceover(using TTS) in a 30-40 seconds long video. Make sure to break up the script into sentences, or scenes, start each scene with the text: "scenesText:", each scene will have a different background video so try to divide it with minimum 5 scenes and maximum of 8 scenes. Remember that the text you provide (after removing the "scenseText " token) will be used as the text for the TTS so do not add any prefix or other addition to it, make sure that the text is aligned to one TTS speaker. The video should be about what the user will send you, if the description provided by the user is too vague or unclear (e.g., just "aaa", "make a video" or similar), please respond with "unable to create", if the text is harmful, racist or violits your policy respond with "content_filter"';

const editPrompt =
  'You have created the following video script: {originalScript} . the user has edited the script, review it, if the user\'s edits have made the script too vague, inconsistent, or have deviated significantly from the original purpose please respond with "unable to create" else respond with "approved"';

const queryPronpt =
  'Act as though you are a video guru with over 20 years of experience creating and producing videos for any and all kinds of audiences. Your purpose and primary function is to provide a text query for an online video site called "pexels", the videos obtaine by each query will be served as the background for the scene text (each video is only 5-8 seconds long). Undestand the idea of the video and comeup with videos that make sense to be one after the other of this text. Make sure that each query is concise (no more than 2 or 3 words) , slightly different from the others, make the query is general and not to spesific and write it ss singular and not as  plural. For example: for a scenes: "Struggling to fall asleep? Let\'s start with a bedtime routine." a good query will be "bad sleep", for the opening scene: "Welcome to our guide for better sleep." something like "Calm nature" will be appropriate. return only the query value for each scene, sperate by ";" Here is the script:';

const dummyGeneratedScript2 =
  "scenesText: Looking to create a positive and inviting atmosphere in your home? Consider maximizing natural light and incorporating plants into your design. \nscenesText: Natural light not only brightens up a space but also positively impacts mood and energy levels. \nscenesText: Make use of windows, skylights, and light-colored decor to enhance the flow of natural light throughout your home. \nscenesText: Adding plants not only brings the outdoors in but also helps purify the air and reduce stress levels. \nscenesText: Opt for low-maintenance houseplants like pothos, succulents, or snake plants to easily incorporate greenery into your living spaces. \nscenesText: Create designated plant corners or shelves near windows to maximize sunlight exposure for your indoor plants. \nscenesText: By combining natural light and plants in your home design, you can create a harmonious and uplifting environment that promotes well-being and positivity.";

const dummyGeneratedScript =
  "scenesText: Are you struggling to get a good night's sleep?  \nscenesText: Let's explore some tips for better sleep.  \nscenesText: Create a routine by going to bed and waking up at the same time every day.  \nscenesText: Make your bedroom conducive to sleep by keeping it cool, dark, and quiet.  \nscenesText: Limit screen time before bed to reduce exposure to blue light, which can disrupt your sleep.  \nscenesText: Try relaxation techniques like deep breathing or meditation to calm your mind before bedtime.  \nscenesText: Avoid heavy meals, caffeine, and alcohol close to bedtime for a better night's rest.  \nscenesText: Stay active during the day to promote better sleep at night.  \nscenesText: Remember, good sleep hygiene is essential for overall health and well-being.  \nscenesText: Implement these tips and start enjoying a more restful night's sleep tonight.";

const dummyQuery =
  "Calm nature; Bedtime routine; Calming ritual; Herbal tea; Power down; Gentle stretches; Comfortable environment; Restful sleep.";

module.exports = {
  llmLogic,
  getSearchQueries,
};
