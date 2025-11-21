const Education = require('./Education');

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
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
