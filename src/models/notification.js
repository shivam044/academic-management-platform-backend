import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: { type: String, required: true }, // Notification title
    message: { type: String, required: true }, // Notification message body
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User who will receive the notification
    type: { type: String, enum: ['info', 'reminder', 'alert', 'success'], default: 'info' }, // Type of notification
    read: { type: Boolean, default: false }, // Status of the notification (read/unread)
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
