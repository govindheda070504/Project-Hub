import React from 'react';
import './Admin.css';
export const Admin =()=>{

return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to Project Hub</h1>
        <p>Your gateway to explore student projects and CVs.</p>
      </header>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for projects or tags..." 
          className="search-bar"
        />
        <button className="search-button">Search</button>
      </div>

      <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="project-cards">
          {/* Sample Project Cards */}
          <div className="project-card">
            <h3>Project Title 1</h3>
            <p>Short description of project 1.</p>
            <span className="tag">#JavaScript</span>
            <span className="tag">#Web Development</span>
          </div>
          <div className="project-card">
            <h3>Project Title 2</h3>
            <p>Short description of project 2.</p>
            <span className="tag">#React</span>
            <span className="tag">#Frontend</span>
          </div>
          <div className="project-card">
            <h3>Project Title 3</h3>
            <p>Short description of project 3.</p>
            <span className="tag">#Python</span>
            <span className="tag">#Data Science</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;

