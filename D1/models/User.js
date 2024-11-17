const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    githubUsername: String,
    dob: Date,
    course: String,
    specialization: String,
    yearOfStudy: String,
    gpa: String,
    phone: String,
    projectType: String,
    repos: [
        {
            name: String,
            tags: [String]
        }
    ]
}, { collection: 'users' }); // Specify the collection name here

module.exports = mongoose.model('User', userSchema);
