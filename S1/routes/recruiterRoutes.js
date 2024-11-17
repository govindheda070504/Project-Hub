// /server/routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const { registerRecruiter, loginRecruiter } = require('../controllers/recruiterController');

router.post('/register', registerRecruiter); // Route for recruiter registration
router.post('/login', loginRecruiter); // Route for recruiter login

module.exports = router;
