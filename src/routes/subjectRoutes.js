import express from 'express';
import auth from '../controllers/auth.controller.js';
import {
  createSubject,
  getSubjectsByUser,
  getSubjectById,
  updateSubject,
  deleteSubject
} from '../controllers/subjectController.js';

const router = express.Router();

// Route to create a new subject
router.post('/api/subject', auth.requireSignin, createSubject);

// Route to get a specific subject by ID
router.route('/api/subjects/:id')
  .get(auth.requireSignin, getSubjectById)
  .put(auth.requireSignin, updateSubject)
  .delete(auth.requireSignin, deleteSubject);

// Route to get subjects by user
router.route('/api/subjects/user/:userId')
  .get(auth.requireSignin, getSubjectsByUser);

export default router;
