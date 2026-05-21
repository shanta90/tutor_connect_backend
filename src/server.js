import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// Load environment variables early in the lifecycle
dotenv.config();

// Establish connection to MongoDB database
connectDB();

const PORT = process.env.PORT || 5000;

// Start listening for incoming network requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
