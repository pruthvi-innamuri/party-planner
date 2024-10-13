// /pages/api/transcribe.js
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false, // Disables body parsing by Next.js to handle file uploads
  },
};

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: false });

    form.parse(req as any, async (err: any, fields: any, files: any) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const file = files.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.filepath), file.originalFilename);
        formData.append('model', 'whisper-1');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: formData as any,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error from OpenAI API:', errorData);
          return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return res.status(500).json({ error: 'Error calling OpenAI API' });
      } finally {
        // Delete the temporary file
        fs.unlink(file.filepath, (err) => {
          if (err) console.error('Error deleting temp file:', err);
        });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
