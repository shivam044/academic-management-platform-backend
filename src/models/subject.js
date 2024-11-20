import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectTitle: { type: String, required: true },
    targetGrade: { type: Number }, // Target Grade for the subject
    uid: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User (Student)
    t_uid: { type: Schema.Types.ObjectId, ref: 'Teacher', required: false }, // Teacher ID Reference (Optional)
    semester_id: { type: Schema.Types.ObjectId, ref: 'Semester', required: false }, // Semester/Term Reference (Optional)
    room: { type: String }, // Room Name/Number
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
