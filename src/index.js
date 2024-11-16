// Import necessary modules
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';  
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import subjectRoutes from './routes/subjectRoutes.js'; 
import gradeRoutes from './routes/gradeRoutes.js'; 
import assignmentRoutes from './routes/assignmentRoutes.js'; 


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

//API routes
app.use('/', authRoutes);
app.use('/', subjectRoutes);
app.use('/', gradeRoutes);
app.use('/', assignmentRoutes);
app.use('/', userRoutes);




// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message });
    console.log(err);
  }
});

// Sample Route
app.get('/', (req, res) => {
  res.send('Academic Management Platform Backend is running');
});


// Catch-all route for handling 404 errors
app.use((req, res) => {
  res.status(404).send('Resource not found');
});
// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
