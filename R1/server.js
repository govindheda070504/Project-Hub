// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const candidateRoutes = require('./routes/candidateroutes');
const connectMongoDB = require('./config/mongodb');

const app = express();
const port = 4300;

// Connect to MongoDB
connectMongoDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/api/recruiter', candidateRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
