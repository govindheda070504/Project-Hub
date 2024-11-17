const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modules/user'); // Ensure this path is correct
const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;


// Register route
router.post('/register', async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        githubUsername,
        dob,
        course,
        specialization,
        yearOfStudy,
        gpa,
        phone,
        projectType,
        repos // Capture repos from the request body
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            email,
            password: hashedPassword,
            firstName,
            lastName,
            githubUsername,
            dob,
            course,
            specialization,
            yearOfStudy,
            gpa,
            phone,
            projectType,
            repos // Save repos directly
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed.', details: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT token with user ID as payload
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        // Return the token in the response body to be used in headers
        res.status(200).json({ 
            message: 'Login successful', 
            token // Include the token in the response
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.', details: error.message });
    }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization; // Use headers instead of cookies
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer token format
        
        // Verify the token with JWT_SECRET
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });
            }
            req.user = user; // Save user info to request object
            next();
        });
    } else {
        res.status(401).json({ error: 'User not authenticated.' });
    }
};

// Export router and authenticateJWT function
module.exports = router;
module.exports.authenticateJWT = authenticateJWT;
