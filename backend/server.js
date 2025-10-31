const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./contact.model');
const Qualification = require('./qualification.model');
const authRoutes = require('./auth.routes');
const User = require('./user.model');
const Project = require('./project.model');
const authMiddleware = require('./auth.middleware'); 

dotenv.config(); 

const app = express();
app.use(express.json()); 
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/check-contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/contacts', async (req, res) => {
  try {
    await Contact.deleteMany();
    res.json({ message: 'All contacts deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.get('/api/projects/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

app.post('/api/projects', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
});

app.delete('/api/projects/:id', async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
});

app.delete('/api/projects', async (req, res) => {
  await Project.deleteMany();
  res.json({ message: 'All projects deleted' });
});

// Get all qualifications
app.get('/api/qualifications', async (req, res) => {
  const qualifications = await Qualification.find();
  res.json(qualifications);
});

app.get('/api/qualifications/:id', async (req, res) => {
  const qualification = await Qualification.findById(req.params.id);
  if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
  res.json(qualification);
});

app.post('/api/qualifications', async (req, res) => {
  const newQualification = new Qualification(req.body);
  await newQualification.save();
  res.status(201).json(newQualification);
});

app.put('/api/qualifications/:id', async (req, res) => {
  const updatedQualification = await Qualification.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedQualification) return res.status(404).json({ message: 'Qualification not found' });
  res.json(updatedQualification);
});

app.delete('/api/qualifications/:id', async (req, res) => {
  const deletedQualification = await Qualification.findByIdAndDelete(req.params.id);
  if (!deletedQualification) return res.status(404).json({ message: 'Qualification not found' });
  res.json({ message: 'Qualification deleted' });
});

app.delete('/api/qualifications', async (req, res) => {
  await Qualification.deleteMany();
  res.json({ message: 'All qualifications deleted' });
});

// Get all users 
app.get('/api/users', authMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/api/users/:id', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Create a new user 
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

app.put('/api/users/:id', authMiddleware, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json(updatedUser);
});

app.delete('/api/users/:id', authMiddleware, async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

app.delete('/api/users', authMiddleware, async (req, res) => {
  await User.deleteMany();
  res.json({ message: 'All users deleted' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
