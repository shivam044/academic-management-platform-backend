const Student = require('../models/Student');  // Adjusted path

exports.createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error creating student' });
  }
};
