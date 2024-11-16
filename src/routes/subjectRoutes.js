import express from 'express';
import auth from '../controllers/authController.js';
import subjectCtrl from '../controllers/subjectController.js';

const subjectRouter = express.Router();

// Route to create a new subject
subjectRouter.post('/api/subject', auth.requireSignin, subjectCtrl.createSubject);

// Route to get a specific subject by ID
subjectRouter.route('/api/subjects/:id')
  .get(auth.requireSignin, subjectCtrl.getSubjectById)
  .put(auth.requireSignin, subjectCtrl.updateSubject)
  .delete(auth.requireSignin, subjectCtrl.deleteSubject);

// Route to get subjects by user
subjectRouter.route('/api/subjects/user/:userId')
  .get(auth.requireSignin, subjectCtrl.getSubjectsByUser);

//Route to list all the subjects
subjectRouter.route('/api/subjects')
  .get(auth.requireSignin, subjectCtrl.getAllSubjects);

export default subjectRouter;
