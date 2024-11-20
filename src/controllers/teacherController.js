import Teacher from '../models/teacher.js';
import User from '../models/user.js';

// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const { first_name, last_name, phone, school_email, uid } = req.body;
    // Check if the user exists
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newTeacher = new Teacher({ first_name, last_name, phone, school_email, uid });
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error creating teacher', error: error.message });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('uid', 'firstName lastName email'); // Populate user info
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error: error.message });
  }
};

// Get a specific teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate('uid', 'firstName lastName email'); // Populate user info
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher', error: error.message });
  }
};

// Update a specific teacher
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone, school_email } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { first_name, last_name, phone, school_email, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error: error.message });
  }
};

// Delete a specific teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error: error.message });
  }
};

export default { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher };
