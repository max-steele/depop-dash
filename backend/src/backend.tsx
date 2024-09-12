import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route setup
//app.use('/api/images', imageRoutes);

// Connect to MongoDB
if (typeof process.env.MONGO_URI !== 'string') throw new Error('MONGO_URI is not a string.');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: any) => console.error('MongoDB connection error:', error));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
