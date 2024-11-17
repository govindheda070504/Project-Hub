// /server/models/Recruiter.js
const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
