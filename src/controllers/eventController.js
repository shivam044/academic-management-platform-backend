// Event Controller
import Event from '../models/event.js';
import User from '../models/user.js';
import Subject from '../models/subject.js';
import Grade from '../models/grade.js';
import Assignment from '../models/assignment.js';

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { name, type, description, date, user_id, related_id, relatedModel } = req.body;
    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Validate related model if provided
    if (related_id && relatedModel) {
      let relatedEntity;
      switch (relatedModel) {
        case 'Subject':
          relatedEntity = await Subject.findById(related_id);
          break;
        case 'Grade':
          relatedEntity = await Grade.findById(related_id);
          break;
        case 'Assignment':
          relatedEntity = await Assignment.findById(related_id);
          break;
        default:
          return res.status(400).json({ message: 'Invalid related model' });
      }
      if (!relatedEntity) {
        return res.status(404).json({ message: `${relatedModel} not found` });
      }
    }
    const newEvent = new Event({ name, type, description, date, user_id, related_id, relatedModel });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('user_id', 'firstName lastName email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get a specific event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('user_id', 'firstName lastName email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

// Update a specific event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, description, date, related_id, relatedModel } = req.body;
    // Validate related model if provided
    if (related_id && relatedModel) {
      let relatedEntity;
      switch (relatedModel) {
        case 'Subject':
          relatedEntity = await Subject.findById(related_id);
          break;
        case 'Grade':
          relatedEntity = await Grade.findById(related_id);
          break;
        case 'Assignment':
          relatedEntity = await Assignment.findById(related_id);
          break;
        default:
          return res.status(400).json({ message: 'Invalid related model' });
      }
      if (!relatedEntity) {
        return res.status(404).json({ message: `${relatedModel} not found` });
      }
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, type, description, date, related_id, relatedModel, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete a specific event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

export default { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
