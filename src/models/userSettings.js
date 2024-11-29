import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSettingsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, default: 'light' }, 
  notifications: {
    email: { type: Boolean, default: true }, // Whether the user wants email notifications
    sms: { type: Boolean, default: false },  // Whether the user wants SMS notifications
    push: { type: Boolean, default: true }   // Whether the user wants push notifications
  },
  language: { type: String, default: 'en' }, 
  privacy: {
    profileVisibility: { type: String, enum: ['public', 'private', 'friends'], default: 'public' },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);
export default UserSettings;
