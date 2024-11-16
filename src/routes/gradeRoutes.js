import express from 'express';
import auth from '../controllers/authController.js';
import gradeCtrl from '../controllers/gradeController.js';

const gradeRouter = express.Router();

// Route to create a new grade
gradeRouter.post('/api/grade', auth.requireSignin, gradeCtrl.createGrade);

// Route to get a specific grade by ID
gradeRouter.route('/api/grades/:id')
  .get(auth.requireSignin, gradeCtrl.getGradeById)
  .put(auth.requireSignin, gradeCtrl.updateGrade)
  .delete(auth.requireSignin, gradeCtrl.deleteGrade);

// Route to get grades by user
gradeRouter.route('/api/grades/user/:userId')
  .get(auth.requireSignin, gradeCtrl.getGradesByUser);

// Route to list all the grades
gradeRouter.route('/api/grades')
  .get(auth.requireSignin, gradeCtrl.getAllGrades);

export default gradeRouter;
