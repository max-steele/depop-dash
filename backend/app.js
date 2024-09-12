// app.js
const express = require('express');
const app = express();
const upload = require('./storage');
const cloudinary = require('./cloudinary');

// Route to handle image upload and processing
app.post('/upload', upload.single('image'), async (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
