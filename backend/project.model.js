const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
