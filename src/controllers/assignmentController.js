// Import necessary modules
import Assignment from '../models/assignment.js';
import User from '../models/user.js';
import Subject from '../models/subject.js';

// Create a new assignment
const createAssignment = async (req, res) => {
  try {
    const { name, s_id, uid, g_id, due_date } = req.body;
    // Check if the user (student) exists
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the subject exists
    const subject = await Subject.findById(s_id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    const newAssignment = new Assignment({ name, s_id, uid, g_id, due_date });
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
};

// Get all assignments for a specific user (student)
const getAssignmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const assignments = await Assignment.find({ uid: userId }).populate('s_id', 'subjectTitle'); // Populate subject info
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// Get a specific assignment by ID
const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id).populate('s_id', 'subjectTitle').populate('uid', 'firstName lastName email'); // Populate subject and user info
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error: error.message });
  }
};

// Get all assignments
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('s_id', 'subjectTitle').populate('uid', 'firstName lastName email'); // Populate subject and user info
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// Update a specific assignment
const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, s_id, g_id, due_date } = req.body;
    if (s_id) {
      const subject = await Subject.findById(s_id);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
    }
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      { name, s_id, g_id, due_date, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating assignment', error: error.message });
  }
};

// Delete a specific assignment
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
};

export default { createAssignment, getAssignmentsByUser, getAssignmentById, getAllAssignments, updateAssignment, deleteAssignment };
