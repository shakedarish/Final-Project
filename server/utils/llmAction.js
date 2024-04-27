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

  // try {
  //   const response = await fetch(baseUrl, requestBody);
  //   if (!response.ok) {
  //     console.error(
  //       `Error in chatComplition: ${response.status}, error: ${response.statusText}`
  //     );
  //     return null;
  //   }

  //   const data = await response.json();
  //   const textResponse = data.choices[0]?.message?.content ?? "";
 const textResponse = "Are you struggling to get a good night's sleep? Let's explore some tips for better sleep. Create a routine by going to bed and waking up at the same time every day. Make your bedroom conducive to sleep by keeping it cool, dark, and quiet. Limit screen time before bed to reduce exposure to blue light, which can disrupt your sleep. Try relaxation techniques like deep breathing or meditation to calm your mind before bedtime. Avoid heavy meals, caffeine, and alcohol close to bedtime for a better night's rest. Stay active during the day to promote better sleep at night. Remember, good sleep hygiene is essential for overall health and well-being. Implement these tips and start enjoying a more restful night's sleep tonight.";
  //   if (!textResponse) {
  //     //handle case of empty resoult
  //     console.log("response was empty");
  //     return null;
  //   }
  //   console.log("textResponse: " + textResponse);
    return textResponse;
  // } catch (error) {
  //   console.error(error);
  //   return null;
  // }
};

module.exports = {
  chatCompletion,
};
