const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 3003;

let videos = [];

app.use(cors()); // Use the cors middleware
app.use(express.json());

app.post('/videos', (req, res) => {
  const { data } = req.body;

  if (data) {
    const newVideo = { data };
    videos.push(newVideo);
    res.status(201).json(newVideo);
  } else {
    res.status(400).json({ error: 'Invalid request, please provide data in the request body.' });
  }
});

app.put('/videos/:id', (req, res) => {
  const videoId = parseInt(req.params.id);
  const updatedData = req.body.data;

  videos = videos.map(video => {
    if (video.id === videoId) video.data = updatedData;
    return video;
  });

  res.json(videos);
});

app.delete('/videos/:id', (req, res) => {
  const videoId = parseInt(req.params.id);

  videos = videos.filter(video => video.id !== videoId);

  res.json(videos);
});

app.get('/videos', (req, res) => {
  res.json(videos);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
