// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [email, setEmail] = useState(''); 
    const [token, setToken] = useState(null);
    const [repoLink, setRepoLink] = useState('');
    const [action, setAction] = useState('add');
    const [tag, setTag] = useState('');
    const [combinedKeywords, setCombinedKeywords] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null); // User profile data

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('email');

        if (storedToken) {
            setToken(storedToken);
            setEmail(storedEmail);
            fetchUserProfile(storedEmail, storedToken);
        } else {
            alert("No token found. Please log in.");
            window.location.href = "/login";
        }

        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const fetchUserProfile = async (email, token) => {
        try {
            const result = await axios.get(`http://localhost:7777/api/user?email=${email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserInfo(result.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            handleError(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return alert("No token found. Please log in.");

        try {
            const result = await axios.post(
                'http://localhost:3000/api/tags-operations', 
                { githubUrl: repoLink, action, tag: action === 'add' || action === 'delete' ? tag : undefined },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCombinedKeywords(result.data.tags || []);
            setShowPopup(true);
            setPopupMessage("Changes have been made to your repository.");
        } catch (error) {
            handleError(error);
        }
    };

    const handleSaveRepository = async () => {
        if (!token) return alert("No token found. Please log in.");

        // Ensure repoLink is provided and is valid
        if (!repoLink) return alert("Repository URL is required");

        // Extract repository name from URL
        const repoName = extractRepoName(repoLink); 
        if (!repoName) return alert("Repository name could not be extracted from the URL");

        try {
            await axios.post(
                'http://localhost:3000/api/repo-data',
                { githubUrl: repoLink },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setShowPopup(true);
            setPopupMessage("Your repository has been saved.");
        } catch (error) {
            handleError(error);
        }
    };


    const handleError = (error) => {
        if (error.response && error.response.status === 403) {
            alert('Access denied! Please log in again.');
            window.location.href = "/login";
        } else {
            alert('An error occurred while processing your request.');
        }
    };

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        // Redirect to login page
        window.location.href = "/login";
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => setShowPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    // Helper function to extract repo name from URL (you can use a library like 'url' or implement a simple one)
    const extractRepoName = (url) => {
        const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = url.match(regex);
        return match ? match[2] : null;
    };

    if (isLoading) {
        return <div className="loading-screen">Loading Dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome, {userInfo ? userInfo.firstName : email}!</h1>

            <div className="profile-section">
    {userInfo && (
        <>
            <h2>Profile Information</h2>
            <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
            <p><strong>Date of Birth:</strong> {new Date(userInfo.dob).toLocaleDateString()}</p>
            <p><strong>Course:</strong> {userInfo.course}</p>
            <p><strong>Specialization:</strong> {userInfo.specialization}</p>
            <p><strong>Year of Study:</strong> {userInfo.yearOfStudy}</p>
            <p><strong>GPA:</strong> {userInfo.gpa}</p>
            <p><strong>Phone:</strong> {userInfo.phone}</p>
            <p><strong>Github Username:</strong> {userInfo.githubUsername}</p>
        </>
    )}
</div>

<div className="dashboard">
                <h2>GitHub Repository Tags Manager</h2>
                <form onSubmit={handleSubmit} className="dashboard-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter GitHub repository link"
                            value={repoLink}
                            onChange={(e) => setRepoLink(e.target.value)}
                            required
                        />
                        <button type="button" onClick={handleSaveRepository} className="save-btn">
                            Save The Repository
                        </button>
                    </div>
                    <select value={action} onChange={(e) => setAction(e.target.value)} className="action-dropdown">
                        <option value="add">Add Tag</option>
                        <option value="get">Get Tag</option>
                        <option value="delete">Delete Tag</option>
                    </select>
                    {(action === 'add' || action === 'delete') && (
                        <input
                            type="text"
                            placeholder="Enter tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            required
                        />
                    )}
                    <button type="submit" className="submit-btn">Submit</button>
                </form>

                {showPopup && (
                    <div className="popup top-right">
                        <p>{popupMessage}</p>
                    </div>
                )}

                {combinedKeywords.length > 0 && (
                    <div className="keywords-container">
                        <h3>Combined Keywords:</h3>
                        <ul>
                            {combinedKeywords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Logout Button */}
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

<div className="repo-section">
    {userInfo && (
        <>
            <h2>Repositories</h2>
            <ul>
                {userInfo.repos.map((repo, index) => (
                    <li key={index}>
                        <a
                            href={`https://github.com/${userInfo.githubUsername}/${repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {repo.name}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )}
</div>


           
        </div>
    );
};

export default Dashboard;
