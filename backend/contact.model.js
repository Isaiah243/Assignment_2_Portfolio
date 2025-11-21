const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  contactNumber: String,
  email: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
