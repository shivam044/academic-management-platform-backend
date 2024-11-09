import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    subjectTitle: { type: String, required: true },
    targetGrade: { type: Number },               //Target Grade for the subject
    uid: { type: Schema.Types.ObjectId, ref: 'User' },     // Reference to User (Student)
    t_uid: { type: Schema.Types.ObjectId, ref: 'User' }, //Teacher UserID Reference
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


const Subject = mongoose.model('Subject', SubjectSchema);
export default Subject;