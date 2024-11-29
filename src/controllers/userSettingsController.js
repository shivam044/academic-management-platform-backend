import UserSettings from '../models/userSettings.js';
import User from '../models/user.js';

// Create or update user settings
const createOrUpdateUserSettings = async (req, res) => {
  try {
    const { userId, theme, notifications, language, privacy } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find settings by userId, if exists update, else create new settings
    let userSettings = await UserSettings.findOne({ userId });
    if (userSettings) {
      userSettings.theme = theme || userSettings.theme;
      userSettings.notifications = notifications || userSettings.notifications;
      userSettings.language = language || userSettings.language;
      userSettings.privacy = privacy || userSettings.privacy;
      userSettings.updated_at = Date.now();
    } else {
      userSettings = new UserSettings({ userId, theme, notifications, language, privacy });
    }

    const savedSettings = await userSettings.save();
    res.status(200).json(savedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error saving user settings', error: error.message });
  }
};

// Get user settings by user ID
const getUserSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const userSettings = await UserSettings.findOne({ userId });
    if (!userSettings) {
      return res.status(404).json({ message: 'User settings not found' });
    }
    res.status(200).json(userSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user settings', error: error.message });
  }
};

// Delete user settings by user ID
const deleteUserSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedSettings = await UserSettings.findOneAndDelete({ userId });
    if (!deletedSettings) {
      return res.status(404).json({ message: 'User settings not found' });
    }
    res.status(200).json({ message: 'User settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user settings', error: error.message });
  }
};

export default { createOrUpdateUserSettings, getUserSettings, deleteUserSettings };
