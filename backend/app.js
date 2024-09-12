const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const upload = require('./storage');
const cloudinary = require('./cloudinary');
import { FILTERS } from './filters.ts';

const app = express();
app.use(cors());

// Route to handle image upload and processing
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Image URL from Cloudinary
    const imageUrl = req.file.path;

    // Perform additional image processing if needed
    // For example, you could apply transformations with Cloudinary here

    // Respond with the image URL
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const images = [
  path.join(__dirname, 'test_images', 'file-0.jpg'),
  path.join(__dirname, 'test_images', 'file-1.jpg'),
  path.join(__dirname, 'test_images', 'file-2.jpg'),
  path.join(__dirname, 'test_images', 'file-3.jpg'),
];

// GET route to return images as Base64
app.get('/api/test-images', async (req, res) => {
  try {
    const base64Images = await Promise.all(
      images.map(async (filePath) => {
        const fileData = await fs.promises.readFile(filePath);
        return `data:image/jpeg;base64,${fileData.toString('base64')}`;
      })
    );

    res.json({ images: base64Images });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images.' });
  }
});

// Return the names of the filters
app.get('/api/get-filters', async (req, res) => {
  try {
    res.json({ filters: FILTERS });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch filters.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
