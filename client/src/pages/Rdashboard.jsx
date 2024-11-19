import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Rdashboard.css';

// Predefined specialization and tag options
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

const gpaOptions = [
    { value: '0-1', label: '0-1' },
    { value: '1-2', label: '1-2' },
    { value: '2-3', label: '2-3' },
    { value: '3-4', label: '3-4' }
];

const projectTypeOptions = [
    { value: 'major', label: 'Major' },
    { value: 'minor', label: 'Minor' }
];

// Full list of tags
const tagOptions = [
    'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'go',
    'typescript', 'r', 'julia', 'shell', 'bash', 'perl', 'scala', 'dart', 'rust',
    'kotlin', 'html', 'css', 'scss', 'less', 'xml', 'json', 'yaml', 'graphql',
    'rest', 'soap', 'webapp', 'website', 'frontend', 'backend', 'full stack',
    'responsive design', 'pwa', 'react', 'angular', 'vue', 'ember', 'backbone',
    'jquery', 'bootstrap', 'tailwind', 'django', 'flask', 'express', 'next.js',
    'svelte', 'fastapi', 'laravel', 'rails', 'spring', 'asp.net', 'sql', 'nosql',
    'mongodb', 'mysql', 'postgresql', 'sqlite', 'redis', 'oracle', 'elasticsearch',
    'docker', 'kubernetes', 'jenkins', 'aws', 'azure', 'google cloud',
    'ci/cd', 'github', 'gitlab', 'bitbucket', 'jira', 'slack', 'trello',
    'nginx', 'apache', 'dns', 'cli', 'cron job', 'blockchain', 'ethereum', 'smart contract',
    'solidity', 'web3', 'ux', 'ui', 'seo', 'agile', 'scrum', 'microservices', 'api'
];

const Rdashboard = () => {
    const [filters, setFilters] = useState({
        course: '',
        specialization: '',
        yearOfStudy: '',
        gpa: '',
        projectType: '',
        tags: [],
        tagSearch: '' // Tag search term
    });
    const [candidates, setCandidates] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('recruiterToken');
        if (!token) {
            // Redirect to login page if no token is found
            alert("Please log in again.");
            navigate('/recruiter');  // Assuming the login route is '/recruiter'
        } else {
            // If token exists, proceed with fetching the candidates
            handleSearch();
        }
    }, []);

    useEffect(() => {
        // Trigger search whenever filters change
        handleSearch();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleTagToggle = (tag) => {
        setFilters((prevFilters) => {
            const tags = prevFilters.tags.includes(tag)
                ? prevFilters.tags.filter((t) => t !== tag)
                : [...prevFilters.tags, tag];

            // Clear the search input when a tag is selected/deselected
            return { ...prevFilters, tags, tagSearch: '' };
        });
    };

    const handleTagSearchChange = (e) => {
        const { value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            tagSearch: value
        }));
    };

    const handleSearch = async () => {
        // Check if at least one filter is selected before performing the search
        const filterKeys = Object.keys(filters);
        const isFilterSelected = filterKeys.some(
            (key) => filters[key] && (Array.isArray(filters[key]) ? filters[key].length > 0 : true)
        );

        if (isFilterSelected) {
            try {
                const response = await axios.get('http://localhost:4300/api/recruiter/search-candidates', { params: filters });
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        } else {
            setCandidates([]); // No filters selected, clear results
        }
    };

    const filteredTags = tagOptions.filter((tag) =>
        tag.toLowerCase().includes(filters.tagSearch.toLowerCase())
    );

    return (
        <div className="rdashboard">
            <div className="filter-sidebar">
                <h2>Filter Candidates</h2>
                
                <label>Course</label>
                <select name="course" value={filters.course} onChange={handleFilterChange}>
                    <option value="">Select Course</option>
                    <option value="Bachelor of Technology(B.Tech)">Bachelor of Technology(B.Tech)</option>
                    <option value="Bachelor in Computer Applications(BCA)">Bachelor in Computer Applications(BCA)</option>
                </select>

                <label>Specialization</label>
                <select name="specialization" value={filters.specialization} onChange={handleFilterChange}>
                    {specializationOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <label>Year of Study</label>
                <select name="yearOfStudy" value={filters.yearOfStudy} onChange={handleFilterChange}>
                    <option value="">Select Year</option>
                    {[1, 2, 3, 4].map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <label>GPA</label>
                <select name="gpa" value={filters.gpa} onChange={handleFilterChange}>
                    <option value="">Select GPA</option>
                    {gpaOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <label>Project Type</label>
                <select name="projectType" value={filters.projectType} onChange={handleFilterChange}>
                    <option value="">Select Project Type</option>
                    {projectTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <div className="tag-section">
                    <label>Tags</label>
                    <input
                        type="text"
                        placeholder="Search Tags"
                        value={filters.tagSearch}
                        onChange={handleTagSearchChange}
                    />
                    <div className={`tags ${expanded ? 'expanded' : ''}`}>
                        {filteredTags.slice(0, expanded ? filteredTags.length : 9).map((tag) => (
                            <div
                                key={tag}
                                className={`tag ${filters.tags.includes(tag) ? 'selected' : ''}`}
                                onClick={() => handleTagToggle(tag)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </div>

            <div className="results-section">
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <div key={candidate._id} className="candidate-card">
                            <h3>{candidate.firstName} {candidate.lastName}</h3>
                            <p><strong>Email:</strong> {candidate.email}</p>
                            <p><strong>Course:</strong> {candidate.course}</p>
                            <p><strong>Specialization:</strong> {candidate.specialization}</p>
                            <p><strong>Year of Study:</strong> {candidate.yearOfStudy}</p>
                            <p><strong>GPA:</strong> {candidate.gpa}</p>
                            <p><strong>Project Type:</strong> {candidate.projectType}</p>
                            <h4>Repositories:</h4>
                            {candidate.repos.length > 0 ? (
                                candidate.repos.map((repo) => (
                                    <div
                                        key={repo._id}
                                        className="repo"
                                    >
                                        <a
                                            href={`https://github.com/${candidate.githubUsername}/${repo.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="repo-link"
                                        >
                                            <p><strong>Repo Name:</strong> {repo.name}</p>
                                            <p><strong>Tags:</strong> {repo.tags.join(', ')}</p>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>No repositories available</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No candidates found.</p>
                )}
            </div>
        </div>
    );
};

export default Rdashboard;
