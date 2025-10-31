const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  completion: Date,
  description: String
});

module.exports = mongoose.model('Qualification', qualificationSchema);
