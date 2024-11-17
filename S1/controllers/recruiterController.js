// /server/controllers/recruiterController.js
const Recruiter = require('../models/Recruiter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register recruiter
exports.registerRecruiter = async (req, res) => {
  const { companyName, email, password, confirmPassword, universityAffiliationCode } = req.body;

  // Check university affiliation code
  if (universityAffiliationCode !== process.env.UNIVERSITY_AFFILIATION_CODE) {
    return res.status(401).json({ error: 'Invalid University Affiliation Code' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
      companyName,
      email,
      password: hashedPassword,
    });

    await newRecruiter.save();
    res.status(201).json({ message: 'Recruiter registered successfully!' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

// Recruiter login
exports.loginRecruiter = async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful!',
      token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};
