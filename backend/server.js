import express from 'express'; // Use 'import' instead of 'require'
import { handleUserQuery } from './conversation/routing.js'; // Ensure relative path is correct

const app = express();
const PORT = 3001;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static('public'));

app.post('/plan-party', async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'No text input received' });
  }

  try {
    // Call handleUserQuery function from imported module
    const response = await handleUserQuery(text);
    
    res.json({
      message: 'Text input received successfully',
      inputText: text,
      response
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
  console.log(`Text input can be posted to http://localhost:${PORT}/plan-party`);
});
