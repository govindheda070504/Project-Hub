// models/candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  course: String,
  specialization: String,
  yearOfStudy: String,
  gpa: String,
  projectType: String,
  githubUsername: String,
  repos: [
    {
      name: String,
      tags: [String],
    }
  ]
});


module.exports = mongoose.model('User', candidateSchema, 'users');
