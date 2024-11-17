// Import necessary modules
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';  // Adjusted path to db.js in config
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Ensure the correct file path


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

//API routes
app.use('/api/auth', authRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Academic Management Platform Backend is running');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
