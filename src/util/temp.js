const chatCompletionRequest = async (requestData) => {
  return `
    scenesText: Dreaming of a European adventure?
    scenesText: Start your journey in the romantic city of Paris, with its iconic Eiffel Tower and charming cafes.
    scenesText: Next stop, the vibrant city of Barcelona, known for its stunning architecture and lively atmosphere.
    scenesText: Explore the historical streets of Rome, home to ancient ruins and delicious gelato.
    scenesText: Travel to the picturesque city of Prague, with its fairytale castles and cobblestone streets.
    scenesText: End your trip in the enchanting city of Amsterdam, famous for its scenic canals and vibrant culture.
    scenesText: Get ready for an unforgettable European experience!
    `;
};

const getScript = async (requestData) => {
  const responseText = await chatCompletionRequest(requestData);

  if (
    responseText.toLowerCase() === "unable to create" ||
    responseText.toLowerCase() === "content_filter"
  ) {
    return responseText;
  }

  const scenes = responseText
    .split("scenesText:")
    .map((scene) => scene.trim())
    .filter(Boolean);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Adjust the pattern for each scene
  const adjustedScenes = scenes.map((scene, index) => {
    const sceneNumber = index + 1;
    const sceneHeader = `Scene ${sceneNumber}:\n`;
    const adjustedScene = `${sceneHeader}${capitalizeFirstLetter(
      scene.trim()
    )}`;
    return adjustedScene;
  });

  // Join the adjusted scenes with a newline
  const adjustedScript = adjustedScenes.join("\n\n");

  return adjustedScript;
};

getScript("Your request data here")
  .then((script) => console.log(script))
  .catch((err) => console.error(err));
