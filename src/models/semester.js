import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    title: { type: String, default: "" }, // Title of the semester, to be set automatically if not provided
    startDate: { type: Date, required: true }, // Start date of the semester
    endDate: { type: Date, required: true }, // End date of the semester
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created this entry
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware to set the default title before saving
semesterSchema.pre('save', async function(next) {
    if (!this.title) {
        // Get the model
        const Semester = mongoose.model('Semester', semesterSchema);

        // Count existing semesters to determine the next title number
        const count = await Semester.countDocuments();
        this.title = `Semester ${count + 1}`;
    }
    next();
});

const Semester = mongoose.model('Semester', semesterSchema);
export default Semester;
