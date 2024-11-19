// Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 
import "./Login.css";

export const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Attempting to log in with:", user); // Log user input for debugging
        try {
            const response = await axios.post("http://localhost:3000/api/login", user, { withCredentials: true });
            console.log("Login response:", response); // Log the full response for debugging

            if (response.status === 200) {
                // Save the token and email to localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', user.email); // Save the email
                console.log("Token and email saved to localStorage:", response.data.token, user.email);

                // Navigate to dashboard
                navigate("/dashboard");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error response:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Login failed. Please check your credentials.");
            }
        }
    };

    return (
        <section>
            <main>
                <div className="section-login">
                    <div className="login-form-wrapper">
                        <h1 className="main-heading">Student Login</h1>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={user.email} 
                                    onChange={handleInput} 
                                    placeholder="Email" 
                                    required 
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={user.password} 
                                    onChange={handleInput} 
                                    placeholder="Password" 
                                    required 
                                />
                            </div>
                            <div className="login-actions">
                                <button type="submit" className="btn btn-submit">Login</button>
                                <p className="recruiter-link">
            Are you a recruiter? <Link to="/recruiter">Click here</Link>
          </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};
