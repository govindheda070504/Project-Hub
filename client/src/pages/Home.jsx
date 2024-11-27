import "./Home.css";
import "./animation.css";
import img1 from '../images/about-img.png';
import img2 from '../images/45.png'; // Corrected path

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section id="hero">
        <div className="section-box">
          <div className="content-wrap">
            <div className="hero-content">
              <h1 className="glowing-text">Project Hub</h1> {/* Added glowing text */}
              <img src={img2} className="hero-img" alt="Hero" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="section-box">
          <div className="content-grid">
            <div className="left-grid">
              <h3 className="section-sub">About us</h3>
              <h2 className="section-title">Who we are?</h2>
              <p>
                At Project Hub, we connect students and recruiters through GitHub project showcases. Students can link their projects, and recruiters can search based on relevant skills and tags to find the perfect match.
              </p>
            </div>
            <div className="right-grid">
              <img src={img1} className="about-img" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Our Platform Section */}
      <section id="how-to-use">
        <div className="section-box">
          <div className="content-wrap">
            <h2 className="how-to-use-heading">How to Use</h2>
            <div className="steps">
              <div className="step-item">
                <h4>Step 1: Create an Account</h4>
                <p>Sign up as a student or recruiter to start.</p>
              </div>
              <div className="step-item">
                <h4>Step 2: Link Your GitHub Projects</h4>
                <p>Students can add their GitHub repositories and relevant tags.</p>
              </div>
              <div className="step-item">
                <h4>Step 3: Explore Projects</h4>
                <p>Recruiters can search for student projects based on tags.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section id="footer">
        <div className="section-box">
          <div className="footer-grid">
            <div>
              <h3>Quick Links</h3>
              <div className="footer-items-wrapper">
                <a className="footer-items f1">Home</a>
                <a className="footer-items f2">about us</a>
                <a className="footer-items f3">projects</a>
                <a className="footer-items f6">contacts</a>
              </div>
            </div>
            <div>
              <h3>Contacts</h3>
              <a className="footer-items f1">+1 (800) 555-9453</a>
              <a className="footer-items f3">ProjectHub@gmail.com</a>
              <a className="footer-items f4">1897, Worli St, Mumbai, India</a>
            </div>
            <div>
              <h3>Socials</h3>
              <div className="footer-items-wrapper">
                <a className="footer-items f1">facebook</a>
                <a className="footer-items f2">youtube</a>
                <a className="footer-items f3">instagram</a>
                <a className="footer-items f4">linkedin</a>
                <a className="footer-items f5">twitter</a>
              </div>
            </div>
          </div>
          <p className="copyrights">all rights reserved</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
