import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gradeSchema = new Schema({

    grade: { type: Number, required: true },
    s_id: { type: Schema.Types.ObjectId, ref: 'Subject' }, // Reference ID to Subject
    a_id: { type: Schema.Types.ObjectId, ref: 'Assignment' }, // Reference ID to Assignment
    uid: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User (Student)
    notes: { type: String }, // Extra notes for information
    date: { type: Date, default: Date.now }, //Set the date the grades were put in
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Grade = mongoose.model('Grade', GradeSchema);
export default Grade;