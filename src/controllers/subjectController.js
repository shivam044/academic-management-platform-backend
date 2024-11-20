import Subject from '../models/subject.js';
import User from '../models/user.js';

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const { subjectTitle, targetGrade, uid, t_uid, semester_id, room } = req.body;
    // Check if the user exists
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newSubject = new Subject({ subjectTitle, targetGrade, uid, t_uid, semester_id, room });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject', error: error.message });
  }
};

// Get all subjects for a specific user (student)
const getSubjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const subjects = await Subject.find({ uid: userId }).populate('t_uid', 'firstName lastName email').populate('semester_id', 'name'); // Populate teacher and semester info
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
};

// Get a specific subject by ID
const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id).populate('t_uid', 'firstName lastName email').populate('semester_id', 'name'); // Populate teacher and semester info
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error: error.message });
  }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('t_uid', 'firstName lastName email').populate('semester_id', 'name'); // Populate teacher and semester info
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
};

// Update a specific subject
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectTitle, targetGrade, t_uid, semester_id, room } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { subjectTitle, targetGrade, t_uid, semester_id, room, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject', error: error.message });
  }
};

// Delete a specific subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error: error.message });
  }
};

export default {createSubject, getSubjectsByUser, getSubjectById, getAllSubjects, updateSubject, deleteSubject};
