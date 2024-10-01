import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';

// Declare the router
const authRouter = express.Router();

// Define routes
authRouter.post('/signin', signIn);
authRouter.post('/signup', signUp)

// Export the router
export default authRouter;
