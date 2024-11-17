const express = require('express');
const cors = require('cors');
const connectDB = require('./mongoose'); // Import the MongoDB connection function
const mongoose = require('mongoose');

const app = express();
const port = 1001;

// Connect to MongoDB
connectDB();

// Define schema for form data
const formDataSchema = new mongoose.Schema({
  email: String,
  problem: String,
}, { timestamps: true });

const FormData = mongoose.model('FormData', formDataSchema);

// Middleware to parse JSON body and handle CORS
app.use(express.json());
app.use(cors());

// POST endpoint to handle the form data (email and problem)
app.post('/submit', async (req, res) => {
  try {
    const { email, problem } = req.body;
    const newFormData = new FormData({ email, problem });
    await newFormData.save();
    res.status(200).json({ message: 'Data received and saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

// GET endpoint to fetch all submitted data
app.get('/getAllData', async (req, res) => {
  try {
    const allData = await FormData.find();
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

// Welcome message for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
