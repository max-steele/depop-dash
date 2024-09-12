const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'depop-dash-images',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = upload;
