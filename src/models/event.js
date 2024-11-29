import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true }, // Event name (e.g., Assignment, Exam, Reminder)
  type: { type: String, enum: ['Assignment', 'Exam', 'Reminder'], required: true }, // Type of event
  description: { type: String }, // Optional description for the event
  date: { type: Date, required: true }, // Date of the event
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  related_id: { type: Schema.Types.ObjectId, refPath: 'relatedModel' }, // Reference to another related model
  relatedModel: { type: String, enum: ['Subject', 'Grade', 'Assignment', 'User'] }, // Name of the related model
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;