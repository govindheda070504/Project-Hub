import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "./Recruiter.css"; // Assuming you're using the same CSS as the student login

const Recruiter = () => {
  const [recruiter, setRecruiter] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRecruiter({
      ...recruiter,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recruiter);
    
    // Prepare the data for the POST request
    const loginData = {
      email: recruiter.email,
      password: recruiter.password,
    };

    try {
      // Send POST request to the backend API for login
      const response = await fetch("http://localhost:3999/api/recruiters/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        
        // Save the token to localStorage
        localStorage.setItem("recruiterToken", data.token);
        
        // Navigate to the recruiter dashboard
        navigate("/Rdashboard");
      } else {
        // Handle login failure (show an error message)
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle network or other errors
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section>
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1 className="main-heading">Recruiter Login</h1>
          
          {/* Display error message if login failed */}
          {error && <p className="error-message">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={recruiter.email}
                onChange={handleInput}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={recruiter.password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>
          
          {/* Signup link */}
          <p className="signup-prompt">
            Not signed up? <Link to="/r_register">Click here to sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Recruiter;
