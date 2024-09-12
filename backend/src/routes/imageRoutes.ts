const express = require('express');
const router = express.Router();
const { uploadImage, getImages } = require('../controllers/imageController');

// POST /api/images/upload - Upload a new image
router.post('/upload', uploadImage);

// GET /api/images - Fetch all images
router.get('/', getImages);

module.exports = router;
