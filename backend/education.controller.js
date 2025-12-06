const Education = require('./education.model');

exports.getEducation = async (req, res) => {
  const data = await Education.find();
  res.json(data);
};

exports.createEducation = async (req, res) => {
  const edu = new Education(req.body);
  await edu.save();
  res.status(201).json(edu);
};

exports.deleteEducation = async (req, res) => {
  const deleted = await Education.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Education not found' });
  res.json({ message: 'Deleted' });
};
