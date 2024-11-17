const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/user', async (req, res) => {
    const email = req.query.email;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email }, 'firstName lastName githubUsername dob course specialization yearOfStudy  gpa phone repos.name');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
