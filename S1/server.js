// /server/server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const recruiterRoutes = require('./routes/recruiterRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/recruiters', recruiterRoutes); // Register routes for recruiters

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
