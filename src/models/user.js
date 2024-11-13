import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }, 
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
  }, 

  role: { type: String, default: 'student', required: true }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }

})

const User = mongoose.model('User', UserSchema);
export default User;