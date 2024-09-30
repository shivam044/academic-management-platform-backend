import express from 'express';
import { signIn } from '../controllers/authController.js';

// Declare the router
const authRouter = express.Router();

// Define routes
authRouter.post('/signin', signIn);

// Export the router
export default authRouter;
