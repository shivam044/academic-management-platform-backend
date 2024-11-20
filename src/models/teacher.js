import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    first_name: { type: String, required: true }, // Teacher's first name
    last_name: { type: String, required: true }, // Teacher's last name
    phone: { type: String, required: true }, // Teacher's phone number
    school_email: { type: String, required: true, unique: true }, // School email for contact
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created this entry
    created_at: { type: Date, default: Date.now }, // Timestamp when the teacher was added
    updated_at: { type: Date, default: Date.now } // Timestamp for the last update
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;