const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String
});

module.exports = mongoose.model('Contact', contactSchema);
