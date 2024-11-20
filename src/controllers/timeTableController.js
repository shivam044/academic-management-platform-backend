import TimeTable from '../models/timetable.js';
import Subject from '../models/subject.js';
import Teacher from '../models/teacher.js';
import User from '../models/user.js';

// Create a new timetable entry
const createTimeTableEntry = async (req, res) => {
  try {
    const { subject_id, day_of_week, start_time, end_time, room, t_uid, note, uid } = req.body;

    // Check if the user exists
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the subject exists
    const subject = await Subject.findById(subject_id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const newTimeTableEntry = new TimeTable({
      subject_id,
      day_of_week,
      start_time,
      end_time,
      room,
      t_uid,
      note,
      uid
    });

    const savedTimeTableEntry = await newTimeTableEntry.save();
    res.status(201).json(savedTimeTableEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating timetable entry', error: error.message });
  }
};

// Get all timetable entries for a specific user
const getTimeTableByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const timeTableEntries = await TimeTable.find({ uid: userId })
      .populate('subject_id', 'subjectTitle')
      .populate('t_uid', 'first_name last_name school_email'); // Populate subject and teacher info

    res.status(200).json(timeTableEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable entries', error: error.message });
  }
};

// Get a specific timetable entry by ID
const getTimeTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const timeTableEntry = await TimeTable.findById(id)
      .populate('subject_id', 'subjectTitle')
      .populate('t_uid', 'first_name last_name school_email'); // Populate subject and teacher info

    if (!timeTableEntry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.status(200).json(timeTableEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable entry', error: error.message });
  }
};

// Get all timetable entries
const getAllTimeTableEntries = async (req, res) => {
  try {
    const timeTableEntries = await TimeTable.find()
      .populate('subject_id', 'subjectTitle')
      .populate('t_uid', 'first_name last_name school_email'); // Populate subject and teacher info

    res.status(200).json(timeTableEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable entries', error: error.message });
  }
};

// Update a specific timetable entry
const updateTimeTableEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject_id, day_of_week, start_time, end_time, room, t_uid, note } = req.body;

    const updatedTimeTableEntry = await TimeTable.findByIdAndUpdate(
      id,
      { subject_id, day_of_week, start_time, end_time, room, t_uid, note, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedTimeTableEntry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.status(200).json(updatedTimeTableEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error updating timetable entry', error: error.message });
  }
};

// Delete a specific timetable entry
const deleteTimeTableEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTimeTableEntry = await TimeTable.findByIdAndDelete(id);

    if (!deletedTimeTableEntry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.status(200).json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting timetable entry', error: error.message });
  }
};

export default {
  createTimeTableEntry,
  getTimeTableByUser,
  getTimeTableById,
  getAllTimeTableEntries,
  updateTimeTableEntry,
  deleteTimeTableEntry
};
