import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

export const Contact = () => {
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await PostData();
  };

  // Function to send POST request
  const PostData = async () => {
    try {
      const res = await axios.post("http://localhost:1001/submit", {
        email,
        problem,
      });

      if (res.status === 200) {
        console.log("Data received and saved successfully!");
        setEmail('');
        setProblem('');
        setShowPopup(true); // Show popup message
      } else {
        console.log("An unexpected error occurred");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // Handle input changes for both email and problem
  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "problem") {
      setProblem(value);
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="contact-container">
      <div className="contact-form-wrapper">
        <h1 className="main-heading">Contact Us</h1>
        <p className='line'>If you have any issues or questions please feel free to reach out to us!</p>

        <div className="contact-details">
          <h2>Contact Details</h2>
          <ul>
            <li>
              <strong>Email: </strong> 
              <a href="mailto:ProjectHub@gmail.com?subject=Contact Inquiry">ProjectHub@gmail.com</a>
            </li>
            <li>
              <strong>Phone: </strong> 
              <a href="tel:+91 99999-99999">99999-99999</a>
            </li>
            <li>
              <strong>Address:</strong> Bidholi Dehradun,Uttrakhand
            </li>
          </ul>
        </div>

        <div className="contact-form">
          <h2>Enter Your Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputs}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="problem">Enter Your Problem:</label>
              <textarea
                id="problem"
                name="problem"
                value={problem}
                onChange={handleInputs}
                placeholder="Describe the problem you're facing"
                rows="4"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-message">
          <p>Thank You! <br />Our team will contact you soon!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </section>
  );
};

export default Contact;
