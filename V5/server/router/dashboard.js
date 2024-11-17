const express = require('express');
const User = require('../modules/user');
const { authenticateJWT } = require('./auth'); // Import authenticateJWT

const router = express.Router();

// Dashboard route
router.get('/dashboard', authenticateJWT, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User data retrieved successfully",
            user,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});

module.exports = router;
