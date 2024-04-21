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
  const temp = {
    messages,
    headers,
    requestBody,
  };
  console.log(temp);

  try {
    const response = await fetch(baseUrl, requestBody);
    if (!response.ok) {
      console.error(
        `Error in chatComplition: ${response.status}, error: ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    const textResponse = data.choices[0]?.message?.content ?? "";

    if (!textResponse) {
      //handle case of empty resoult
      console.log("response was empty");
      return null;
    }
    console.log("textResponse: " + textResponse);
    return textResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  chatCompletion,
};
