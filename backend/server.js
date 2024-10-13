import express from 'express';
import cors from 'cors'; // Import the cors package
import { handleUserQuery } from './conversation/routing.js';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/plan-party', async (req, res) => {
  const { transcription } = req.body; // Change 'text' to 'transcription' to match the frontend
  console.log(transcription);
  
  if (!transcription) {
    return res.status(400).json({ error: 'No transcription received' });
  }

  try {
    const response = await handleUserQuery(transcription);
    console.log(response.result);
    return res.json({
      success: true,
      message: 'Transcription processed successfully',
      inputTranscription: transcription,
      result: response
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Transcriptions can be posted to http://localhost:${PORT}/plan-party`);
});
