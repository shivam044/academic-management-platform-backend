import Semester from '../models/semester.js';
import User from '../models/user.js';

// Create a new semester
const createSemester = async (req, res) => {
  try {
    const { startDate, endDate, uid } = req.body;
    // Check if the user exists
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newSemester = new Semester({ startDate, endDate, uid });
    const savedSemester = await newSemester.save();
    res.status(201).json(savedSemester);
  } catch (error) {
    res.status(500).json({ message: 'Error creating semester', error: error.message });
  }
};

// Get all semesters
const getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().populate('uid', 'firstName lastName email'); // Populate user info
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching semesters', error: error.message });
  }
};

// Get a specific semester by ID
const getSemesterById = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findById(id).populate('uid', 'firstName lastName email'); // Populate user info
    if (!semester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json(semester);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching semester', error: error.message });
  }
};

// Update a specific semester
const updateSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, startDate, endDate } = req.body;
    const updatedSemester = await Semester.findByIdAndUpdate(
      id,
      { title, startDate, endDate, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedSemester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json(updatedSemester);
  } catch (error) {
    res.status(500).json({ message: 'Error updating semester', error: error.message });
  }
};

// Delete a specific semester
const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSemester = await Semester.findByIdAndDelete(id);
    if (!deletedSemester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json({ message: 'Semester deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting semester', error: error.message });
  }
};

export default { createSemester, getAllSemesters, getSemesterById, updateSemester, deleteSemester };
