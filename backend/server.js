const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Contact = require('./contact.model');
const Qualification = require('./qualification.model');
const Project = require('./project.model');
const User = require('./user.model');
const authRoutes = require('./auth.routes');
const authMiddleware = require('./auth.middleware');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

//  Contact Routes
app.get('/api/contacts', async (req, res) => {
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

// Project routes
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.get('/api/projects/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

app.post('/api/projects', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can create projects' });
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can update projects' });
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete projects' });
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
});

app.delete('/api/projects', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete all projects' });
  await Project.deleteMany();
  res.json({ message: 'All projects deleted' });
});

//  Qualification Routes
app.get('/api/qualifications', async (req, res) => {
  const qualifications = await Qualification.find();
  res.json(qualifications);
});

app.get('/api/qualifications/:id', async (req, res) => {
  const qualification = await Qualification.findById(req.params.id);
  if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
  res.json(qualification);
});

app.post('/api/qualifications', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can create qualifications' });
  const newQualification = new Qualification(req.body);
  await newQualification.save();
  res.status(201).json(newQualification);
});

app.put('/api/qualifications/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can update qualifications' });
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Qualification not found' });
  res.json(updated);
});

app.delete('/api/qualifications/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete qualifications' });
  const deleted = await Qualification.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Qualification not found' });
  res.json({ message: 'Qualification deleted' });
});

app.delete('/api/qualifications', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete all qualifications' });
  await Qualification.deleteMany();
  res.json({ message: 'All qualifications deleted' });
});

//  User Routes
app.get('/api/users', authMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/api/users/:id', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.post('/api/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const bcrypt = require('bcryptjs');
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed, role: role || 'user' });
  await user.save();
  res.status(201).json(user);
});

app.put('/api/users/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can update users' });
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(updated);
});

app.delete('/api/users/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete users' });
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

app.delete('/api/users', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin can delete all users' });
  await User.deleteMany();
  res.json({ message: 'All users deleted' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
