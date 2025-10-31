// server.js
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// MongoDB connection string
const mongoURI = "mongodb+srv://zay23:ricegum23@cluster0.md80daj.mongodb.net/Portfolio?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

