const express = require('express');
const cors = require('cors');
const mongoose = require('./modules/mongoose'); // Ensure this is the correct path
const authRoutes = require('./router/auth');
const dashboardRoutes = require('./router/dashboard');
const routes = require('./router/routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your front-end URL
    credentials: true, // Allow credentials
};

// Middleware
app.use(cors(corsOptions)); // Use the CORS middleware with options
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser
app.use(express.static('public')); // Serve static files if needed

// Routes
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
