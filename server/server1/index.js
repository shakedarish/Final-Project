const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3003;
//const {Configuration, OpenAIApi} = require("opanai");

app.use(cors()); // Use the cors middleware
app.use(express.json());
require('dotenv').config();
//const apiKey = process.env.OPEN_AI_KEY;
const apiKey = "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";
app.post('/completions', async (req, res) => {
  try{
    const message = req.body.message;
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message }],
      max_tokens: 100,
    })
  };
    const response = await fetch('https://api.openai.com/v1/chat/completions', options)
    const data = await response.json()
    res.json(data);
}catch(error){
  console.error("Error generating completion:", error);
  res.status(500).json({error: 'Internal server error'});
}
    //videos.push(newVideo);
    // res.status(201).json(newVideo);
  // } else {
  //   res.status(400).json({ error: 'Invalid request, please provide data in the request body.' });
});

// app.put('/videos/:id', (req, res) => {
//   const videoId = parseInt(req.params.id);
//   const updatedData = req.body.data;

//   videos = videos.map(video => {
//     if (video.id === videoId) video.data = updatedData;
//     return video;
//   });

//   res.json(videos);
// });

// app.delete('/videos/:id', (req, res) => {
//   const videoId = parseInt(req.params.id);

//   videos = videos.filter(video => video.id !== videoId);

//   res.json(videos);
// });

// app.get('/videos', (req, res) => {
//   res.json(videos);
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
