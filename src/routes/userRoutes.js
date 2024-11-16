import express from 'express';
import auth from '../controllers/authController.js';
import userCtrl from '../controllers/userController.js';

const userRouter = express.Router();

// Route to create a new user
userRouter.post('/api/user', userCtrl.createUser);

// Route to get a specific user by ID
userRouter.route('/api/users/:id')
  .get(auth.requireSignin, userCtrl.getUserById)
  .put(auth.requireSignin, userCtrl.updateUser)
  .delete(auth.requireSignin, userCtrl.deleteUser);

// Route to list all users
userRouter.route('/api/users')
  .get(auth.requireSignin, userCtrl.getAllUsers);

export default userRouter;
