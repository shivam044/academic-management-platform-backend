// Import necessary modules
import Subject from '../models/subject.js';
import User from '../models/user.js';

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { subjectTitle, targetGrade, uid, t_uid } = req.body;
    // Check if the user exists
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the teacher exists
    if (t_uid) {
      const teacher = await User.findById(t_uid);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
    }
    const newSubject = new Subject({ subjectTitle, targetGrade, uid, t_uid });
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject', error: error.message });
  }
};

// Get all subjects for a specific user (student)
export const getSubjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const subjects = await Subject.find({ uid: userId }).populate('t_uid', 'firstName lastName email'); // Populate teacher info
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
};

// Get a specific subject by ID
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id).populate('t_uid', 'firstName lastName email'); // Populate teacher info
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error: error.message });
  }
};

// Update a specific subject
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectTitle, targetGrade, t_uid } = req.body;
    if (t_uid) {
      const teacher = await User.findById(t_uid);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
    }
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { subjectTitle, targetGrade, t_uid, updated_at: Date.now() },
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
export const deleteSubject = async (req, res) => {
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
