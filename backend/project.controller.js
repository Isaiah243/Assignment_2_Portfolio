const Project = require('./Project');

exports.getProjects = async (req, res) => {
  const data = await Project.find();
  res.json(data);
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
