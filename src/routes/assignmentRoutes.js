import express from 'express';
import auth from '../controllers/authController.js';
import assignmentCtrl from '../controllers/assignmentController.js';

const assignmentRouter = express.Router();

// Route to create a new assignment
assignmentRouter.post('/api/assignment', auth.requireSignin, assignmentCtrl.createAssignment);

// Route to get a specific assignment by ID
assignmentRouter.route('/api/assignments/:id')
  .get(auth.requireSignin, assignmentCtrl.getAssignmentById)
  .put(auth.requireSignin, assignmentCtrl.updateAssignment)
  .delete(auth.requireSignin, assignmentCtrl.deleteAssignment);

// Route to get assignments by user
assignmentRouter.route('/api/assignments/user/:userId')
  .get(auth.requireSignin, assignmentCtrl.getAssignmentsByUser);

// Route to list all assignments
assignmentRouter.route('/api/assignments')
  .get(auth.requireSignin, assignmentCtrl.getAllAssignments);

export default assignmentRouter;
