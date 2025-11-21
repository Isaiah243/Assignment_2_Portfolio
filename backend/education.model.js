const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: String,
  endDate: String
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
