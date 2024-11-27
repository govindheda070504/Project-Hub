import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    course: "",
    specialization: "",
    yearOfStudy: "",
    gpa: "",
    githubUsername: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    projectType: "" // New field for project type
  });

  const [error, setError] = useState(""); // For displaying errors
  const [success, setSuccess] = useState(""); // For displaying success message
  const [loading, setLoading] = useState(false); // Manage loading state
  const [countdown, setCountdown] = useState(3); // Countdown for redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send a post request to the register API
      const response = await axios.post("http://localhost:3000/api/register", formData);

      if (response.status === 201) {
        setSuccess("Registration successful! You can now login.");
        setLoading(true);

        // Start countdown for redirecting to login page
        let timer = 3;
        const countdownTimer = setInterval(() => {
          setCountdown(timer);
          if (timer === 0) {
            clearInterval(countdownTimer);
            window.location.href = '/login';  // Redirect to login page
          }
          timer -= 1;
        }, 1000);

        // Reset form data after success
        setFormData({
          firstName: "",
          lastName: "",
          dob: "",
          course: "",
          specialization: "",
          yearOfStudy: "",
          gpa: "",
          githubUsername: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          projectType: ""
        });
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const specializationOptions = [
    { value: '', label: 'Select Specialization' },
    { value: 'Cloud Computing & Virtualization Techniques', label: 'Cloud Computing & Virtualization Techniques' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Full Stack & Artificial Intelligence', label: 'Full Stack & Artificial Intelligence' },
    { value: 'Artificial Intelligence & Machine Learning', label: 'Artificial Intelligence & Machine Learning' },
    { value: 'Graphics & Gaming', label: 'Graphics & Gaming' },
    { value: 'Cyber Security', label: 'Cyber Security' },
    { value: 'Big Data', label: 'Big Data' }
  ];

  const courseOptions = [
    { value: '', label: 'Select Course' },
    { value: 'Bachelor of Technology(B.Tech)', label: 'Bachelor of Technology(B.Tech)' },
    { value: 'Bachelor in Computer Applications(BCA)', label: 'Bachelor in Computer Applications(BCA)' }
  ];

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        {loading ? (
          <div className="loading-screen">
            <h2>Redirecting to Login...</h2>
            <p>Redirecting in {countdown} seconds...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            <h1>Create Your Account</h1>
            {error && <p className="error-message">{error}</p>} {/* Error message */}
            {success && <p className="success-message">{success}</p>} {/* Success message */}

            <div className="form-field">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                placeholder="Date of Birth"
                required
              />
            </div>

            {/* Course Dropdown */}
            <div className="form-field">
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                {courseOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization Dropdown */}
            <div className="form-field">
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              >
                {specializationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleInputChange}
                required
              >
                <option value="">Year of Study</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div className="form-field">
              <input
                type="text"
                name="gpa"
                value={formData.gpa}
                onChange={handleInputChange}
                placeholder="Enter your GPA"
                required
              />
            </div>
            <div className="form-field">
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Project Type</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
            </div>

            <div className="form-field">
              <input
                type="text"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleInputChange}
                placeholder="GitHub Username"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <button type="submit" className="register-btn">Register</button>

            <div className="recruiter-link">
              <p>Are you a recruiter ? <a href="/r_register">click here</a></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
