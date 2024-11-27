// src/pages/RRegister.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './r_register.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

export const RRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    universityAffiliationCode: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [countdown, setCountdown] = useState(3); // Countdown state
  const navigate = useNavigate(); // Initialize navigate hook

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
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3999/api/recruiters/register', formData);
      
      if (response.status === 201) {
        setSuccess('Registration successful! You will be redirected to the login page.');
        setError('');
        setFormData({
          companyName: '',
          email: '',
          password: '',
          confirmPassword: '',
          universityAffiliationCode: ''
        });

        // Start loading screen and countdown
        setLoading(true);
        
        // Countdown for 3 seconds
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval); // Clear interval when countdown reaches 0
              navigate('/recruiter'); // Redirect to login page
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      {loading ? (
        <div className="loading-screen">
          <h1>Redirecting to Login in {countdown}...</h1>
        </div>
      ) : (
        <div className="register-form-wrapper">
          <form onSubmit={handleSubmit} className="register-form">
            <h1>Recruiter Signup</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="form-field">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Company Email"
                required
              />
            </div>
            <div className="form-field">
              <input
                type="password"
                name="universityAffiliationCode"
                value={formData.universityAffiliationCode}
                onChange={handleInputChange}
                placeholder="University Affiliation Code"
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
          </form>
        </div>
      )}
    </div>
  );
};

export default RRegister;
