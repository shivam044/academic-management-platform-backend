import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const timeTableSchema = new Schema({
    subject_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true }, // Reference to the Subject
    day_of_week: { type: String, required: true }, // Day of the week (e.g., "Monday", "Tuesday")
    start_time: { type: String, required: true }, // Start time of the class (e.g., "09:00 AM")
    end_time: { type: String, required: true }, // End time of the class (e.g., "10:30 AM")
    room: { type: String, default: "" }, // Room name/number (optional)
    t_uid: { type: Schema.Types.ObjectId, ref: 'Teacher', required: false }, // Reference to Teacher (optional)
    note: { type: String, default: "" }, // Additional notes (optional)
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created this entry
    created_at: { type: Date, default: Date.now }, // Timestamp when the timetable entry was added
    updated_at: { type: Date, default: Date.now } // Timestamp for the last update
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);
export default TimeTable;
