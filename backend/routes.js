const fs = require('fs');
const path = require('path');
const upload = require('./storage');

require('dotenv').config();

// Test Images
const images = [
  path.join(__dirname, 'test_images', 'file-0.jpg'),
  path.join(__dirname, 'test_images', 'file-1.jpg'),
  path.join(__dirname, 'test_images', 'file-2.jpg'),
  path.join(__dirname, 'test_images', 'file-3.jpg'),
];

// Filters for UI
const FILTERS = [
  {
    id: 'grayscale',
    name: 'Monotone Grayscale',
  },
  {
    id: 'remove_bg',
    name: 'Remove Background',
  },
];

// Routes
module.exports = (app) => {
  // Applies Monotone Grayscale filter for a single image
  app.get('/api/apply-mg', async (req, res) => {
    //const { apiKey, filter, imagePath } = req.body; // Assuming API key and image path are passed in the request
    
    const imagePath = images[0];
    const imageData = await fs.promises.readFile(imagePath);
    const base64Image = imageData.toString('base64'); // Convert image to base64

    try {
      const payload = {
        apikey: process.env.PIXO_API_KEY,
        saturation: -0.5,
        brightness: 0.5,
        src: `data:image/jpeg;base64,${base64Image}`
      };
  
      const response = await fetch('https://pixoeditor.com/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
      } else {
        const errorResponse = await response.json();
        res.status(response.status).json({ error: errorResponse });
      }
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });

  // Removes the background for a single image (Remove Background filter)
  app.post('/api/apply-removebg', async (req, res) => {
    //const { apiKey, filter, imagePath } = req.body; // Assuming API key and image path are passed in the request
    
    const imagePath = images[0];
    const imageData = await fs.promises.readFile(imagePath);
    const base64Image = imageData.toString('base64'); // Convert image to base64

    try {
      const payload = {
        apikey: process.env.PIXO_API_KEY,
        background: {
          "type": "solidcolor",
          "bgcolor": "white"
        },
        src: `data:image/jpeg;base64,${base64Image}`
      };
  
      const response = await fetch('https://pixoeditor.com/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
      } else {
        const errorResponse = await response.json();
        res.status(response.status).json({ error: errorResponse });
      }
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  });

  // GET: return the filters
  app.get('/api/get-filters', async (req, res) => {
    try {
      res.json({ filters: FILTERS });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch filters.' });
    }
  });
};
