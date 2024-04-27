require("dotenv").config();

const chatCompletion = async (systemContent, userContent) => {
  const openAIKey = process.env.OPEN_AI_KEY;
  const baseUrl = process.env.OPEN_AI_BASE_URL;
  const openAIModel = process.env.OPEN_AI_MODEL;

  const messages = [
    { role: "system", content: systemContent },
    { role: "user", content: userContent },
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

  try {
    const response = await fetch(baseUrl, requestBody);
    if (!response.ok) {
      console.error(
        `Error in chatComplition: ${response.status}, error: ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();

    // if request was filterd by openAI due to a flag from our content filters
    if (data.choices[0]?.finish_reason == "finish_reason") {
      return "content_filter";
    }
    const textResponse = data.choices[0]?.message?.content ?? "";
    if (!textResponse) {
      console.error("response was empty");
      return null;
    }
    console.log("textResponse: " + textResponse);
    return textResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const editedPrompt =
  'the user has edited the script text, review it, if the user\'s edits have made the script too vague, inconsistent, or have deviated significantly from the original purpose please respond with "unable to create"';

module.exports = {
  chatCompletion,
};
