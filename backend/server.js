const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3001;

app.use(express.static('public'));

app.post('/plan-party', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file received' });
  }

  const filePath = path.join(__dirname, req.file.path);
  
  // Here you would typically process the audio file
  // For this example, we'll just acknowledge receipt
  
  res.json({
    message: 'Audio received successfully',
    fileName: req.file.originalname,
    fileSize: req.file.size
  });

  // Optionally, remove the file after processing
  fs.unlinkSync(filePath);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Audio can be uploaded to http://localhost:${PORT}/plan-party`);
});