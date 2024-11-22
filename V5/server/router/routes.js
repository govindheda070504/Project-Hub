const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modules/user');
const { getRepoTopics, filterTechnologyKeywords } = require('../modules/keywords');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to parse GitHub URL for owner and repo, supporting URLs with or without .git extension
const parseGitHubURL = (url) => {
    const regex = /https?:\/\/github\.com\/([\w-]+)\/([\w-]+)(\.git)?$/;
    const match = url.match(regex);
    return match ? { owner: match[1], repo: match[2] } : null;
};

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'User not authenticated.' });
    }
};

// Register route
router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, githubUsername, dob, course, specialization, yearOfStudy, gpa, phone, projectType } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, firstName, lastName, githubUsername, dob, course, specialization, yearOfStudy, gpa, phone, projectType });
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
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
});

// Fetch and update repo data with tags
router.post('/repo-data', authenticateJWT, async (req, res) => {
    const { githubUrl } = req.body;
    if (!githubUrl || typeof githubUrl !== 'string') {
        return res.status(400).json({ error: 'Invalid GitHub URL.' });
    }

    const repoInfo = parseGitHubURL(githubUrl);
    if (!repoInfo) {
        return res.status(400).json({ error: 'Invalid GitHub repository URL format.' });
    }

    try {
        const { owner, repo } = repoInfo;

        const user = await User.findOne({ githubUsername: owner });
        if (!user) {
            return res.status(404).json({ error: 'User with matching GitHub username not found.' });
        }

        const repoTopics = await getRepoTopics(owner, repo);
        const technologyKeywords = await filterTechnologyKeywords(owner, repo);
        const tags = [...new Set([...repoTopics, ...technologyKeywords])];

        user.repos = user.repos || [];
        const existingRepo = user.repos.find(r => r.name === repo);
        if (existingRepo) {
            existingRepo.tags = existingRepo.tags || [];
            existingRepo.tags = [...new Set([...existingRepo.tags, ...tags])];
        } else {
            user.repos.push({ name: repo, tags });
        }

        await user.save();
        res.status(200).json({ message: 'Tags extracted and saved successfully!', tags });
    } catch (error) {
        console.error('Error fetching repo data or updating user:', error.message);
        res.status(500).json({ error: 'Failed to fetch repository data or update user.', details: error.message });
    }
});

// Tags operations route (CRUD for tags)
router.post('/tags-operations', authenticateJWT, async (req, res) => {
    const { githubUrl, tag, action } = req.body;

    if (!githubUrl || typeof githubUrl !== 'string') {
        return res.status(400).json({ error: 'Invalid GitHub URL.' });
    }

    const repoInfo = parseGitHubURL(githubUrl);
    if (!repoInfo) {
        return res.status(400).json({ error: 'Invalid GitHub repository URL format.' });
    }

    const { owner, repo } = repoInfo;

    try {
        const user = await User.findOne({ githubUsername: owner });
        if (!user) {
            return res.status(404).json({ error: 'User with matching GitHub username not found.' });
        }

        const existingRepo = user.repos.find(r => r.name === repo);
        if (!existingRepo) {
            return res.status(404).json({ error: 'Repository not found.' });
        }

        // Handle different actions
        if (action === 'add') {
            if (!tag) {
                return res.status(400).json({ error: 'Tag is required for adding.' });
            }
            if (!existingRepo.tags.includes(tag)) {
                existingRepo.tags.push(tag);
                await user.save();
                return res.status(200).json({ message: 'Tag added successfully!', tags: existingRepo.tags });
            } else {
                return res.status(400).json({ error: 'Tag already exists.' });
            }
        } else if (action === 'get') {
            return res.status(200).json({ tags: existingRepo.tags });
        } else if (action === 'delete') {
            if (!tag) {
                return res.status(400).json({ error: 'Tag is required for deletion.' });
            }
            const tagIndex = existingRepo.tags.indexOf(tag);
            if (tagIndex > -1) {
                existingRepo.tags.splice(tagIndex, 1); // Remove the tag
                await user.save();
                return res.status(200).json({ message: 'Tag removed successfully!', tags: existingRepo.tags });
            } else {
                return res.status(404).json({ error: 'Tag not found in the repository.' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid action specified. Use "add", "get", or "delete".' });
        }
    } catch (error) {
        console.error('Error processing tag operations:', error.message);
        res.status(500).json({ error: 'Failed to process tag operations.', details: error.message });
    }
});

module.exports = router;
