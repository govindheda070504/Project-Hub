const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Minor-Project-Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    githubUsername: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    course: { type: String, required: true },
    specialization: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    gpa: { type: String, required: true },
    phone: { type: String, required: true },
    projectType: { type: String, required: true },
    repos: [
        {
            name: { type: String, required: true },
            tags: { type: [String], default: [] } // Tags associated with the repository
        },
    ],
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = { User };
