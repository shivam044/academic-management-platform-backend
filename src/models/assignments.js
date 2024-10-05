import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    name: { type: String, required: true }, // Assignment Name
    s_id: { type: Schema.Types.ObjectId, ref: 'Subject' }, // Reference to Subject
    uid: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User (Student)
    g_id: { type: Schema.Types.ObjectId, ref: 'Grade' }, // Reference to Grade for Grades
    due_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);
export default Assignment;