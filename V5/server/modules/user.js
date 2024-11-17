const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Repository name
    tags: { type: [String], default: [] }   // Tags associated with the repository
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Unique email
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    githubUsername: { type: String, required: true, unique: true }, // Unique GitHub username
    dob: { type: Date },
    course: { type: String },
    specialization: { type: String },
    yearOfStudy: { type: Number },
    gpa: { type: Number },
    phone: { type: String },
    projectType: { type: String },
    repos: { type: [RepoSchema], default: [] } // Array of repositories
});

// Avoid recompiling the model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
