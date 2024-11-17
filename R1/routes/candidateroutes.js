// routes/candidateroutes.js

const express = require('express');
const router = express.Router();
const { searchCandidates } = require('../controllers/candidate');

router.get('/search-candidates', searchCandidates);

module.exports = router;
