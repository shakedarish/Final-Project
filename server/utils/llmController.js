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

const getSearchKeywords = async (text) => {
  try {
    return await llmCall(keywordsPromp, text);
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
  'As a video guru with over 20 years of experience in creating and producing videos for diverse audiences. Your purpose and primary function are to produce a text script that will be used as the voiceover(using TTS) in a 30-40 second long video (about 120 words count). Make sure to break up the script into sentences, or scenes, start each scene with the text: "scenesText:" (and the the text itsels, dont add any other prefix to the text ), each scene will have a different background video, and divide the script into a minimum of 5 scenes and a maximum of 8. Remember that the text you provide (after removing the "scenseText" token) will be used as the text for the TTS so do not add any prefix or other addition to it, make sure that the text is aligned to one TTS speaker. The video should be about what the user will send you if the description provided by the user is too vague or unclear (e.g., just "aaa", "make a video" or similar), please respond with "unable to create", if the text is harmful, racist or violates your policy respond with "content_filter"';

const editPrompt =
  'You have created the following video script: {originalScript} . the user has edited the script, review it, if the user\'s edits have made the script too vague, inconsistent, or have deviated significantly from the original purpose please respond with "unable to create", if the edited text is harmful, racist or violates your policy respond with "content_filter" else respond with "approved"';

const keywordsPromp =
  "Imagine you are a seasoned video producer with over 20 years of experience creating content for diverse audiences. Your current task is selecting background videos from an online platform called 'Pexels'. Your objective is to identify the essences of each scene from the following text and formulate concise search keywords to be queries (2-3 words each) that are broad yet relevant to return useful video result (for each scene under 'scene'). Understand the main idea of the full video and come up with keywords for videos that make sense to be one after the other. Make sure that the keywords are different and diverse from each other. Additionally, for each scene provide a backup search keyword that is a single, more general word. For instance, for the scene: 'Struggling to fall asleep? Let's start with a bedtime routine.', an appropriate keywords for that scene might be ['bedtime routine', 'sleep'], for the example scene  'Next, immerse yourself in the historic beauty of Paris, France, known for its iconic landmarks like the Eiffel Tower', [Eiffel Tower', 'Paris'] fits well. For each scene in the text provide an array of the 2 keywords as described, separate each array with “;”(for example if the text had 5 scenes your response structure should look like: [];[];[];[];[] and that each array is: [main keyword, simple backup keyword])";

const dummyBetterPeson =
  "Scene 1:Are you ready to become a better person? It all starts with self-reflection and awareness. Take a moment to reflect on your strengths and weaknesses. Embrace your unique qualities and acknowledge areas where you can improve. Scene 2: Practice empathy and compassion towards others. Put yourself in someone else's shoes and try to understand their perspective. mall acts of kindness can make a big difference in someone's day.Scene 3:Set meaningful goals for personal growth. Whether it's improving your communication skills, being more mindful, or cultivating healthy habits, every step counts towards becoming the best version of yourself.Scene 4:Surround yourself with positivity. Build a supportive network of friends and family who lift you up and encourage your personal development. Remember, you are the sum of the people you spend the most time with.Scene 5:Finally, make self-care a priority. Take care of your physical, mental, and emotional well-being. Practice gratitude, exercise, meditate, and indulge in activities that bring you joy. Remember, becoming a better person is a journey, not a destination. Embrace the process and keep growing every day.";

const dummyGeneratedScript2 =
  "scene 1: Looking to create a positive and inviting atmosphere in your home? Consider maximizing natural light and incorporating plants into your design. scene 2: Natural light not only brightens up a space but also positively impacts mood and energy levels. scene 3: Make use of windows, skylights, and light-colored decor to enhance the flow of natural light throughout your home. scene 4: Adding plants not only brings the outdoors in but also helps purify the air and reduce stress levels. scene 5: Opt for low-maintenance houseplants like pothos, succulents, or snake plants to easily incorporate greenery into your living spaces. scene 6: Create designated plant corners or shelves near windows to maximize sunlight exposure for your indoor plants. scene 7: By combining natural light and plants in your home design, you can create a harmonious and uplifting environment that promotes well-being and positivity.";

const dummyGeneratedScript =
  "scenesText: Are you struggling to get a good night's sleep?  \nscenesText: Let's explore some tips for better sleep.  \nscenesText: Create a routine by going to bed and waking up at the same time every day.  \nscenesText: Make your bedroom conducive to sleep by keeping it cool, dark, and quiet.  \nscenesText: Limit screen time before bed to reduce exposure to blue light, which can disrupt your sleep.  \nscenesText: Try relaxation techniques like deep breathing or meditation to calm your mind before bedtime.  \nscenesText: Avoid heavy meals, caffeine, and alcohol close to bedtime for a better night's rest.  \nscenesText: Stay active during the day to promote better sleep at night.  \nscenesText: Remember, good sleep hygiene is essential for overall health and well-being.  \nscenesText: Implement these tips and start enjoying a more restful night's sleep tonight.";

const dummyQuery =
  "Calm nature; Bedtime routine; Calming ritual; Herbal tea; Power down; Gentle stretches; Comfortable environment; Restful sleep.";

module.exports = {
  llmLogic,
  getSearchKeywords,
};
