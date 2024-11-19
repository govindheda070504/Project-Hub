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
              <h1>PROJECTS</h1>
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
                At Project Hub, we are a platform designed to connect college students with industry leaders through meaningful,
                project-based showcases. By allowing students to link their GitHub projects with relevant tags,
                we streamline the process for companies to find candidates with specific skills and expertise.
                Our mission is to make hiring more efficient and impactful by bridging students’ creativity and technical knowledge with companies’ needs, creating a space where discovery, growth, and opportunity come together.
              </p>
            </div>
            <div className="right-grid">
              <img src={img1} className="about-img" alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join-us">
        <div className="section-box">
          <div className="content-wrap">
            <h3 className="section-sub">join with us</h3>
            <h2 className="section-title">Take Your Projects To New Heights</h2>
            <div className="join-form">
              <input type="text" className="input-1 i1" placeholder="Your Name" />
              <input type="email" className="input-1 i2" placeholder="Your Email" />
              <input type="text" className="input-1 i3" placeholder="Your Number" />
              <input type="text" className="input-1 i4" placeholder="Your Address" />

              <p>Membership</p>
              <div className="checkbox-wrap">
                <label><input type="checkbox" /> Individual</label>
                <label><input type="checkbox" /> Family</label>
                <label><input type="checkbox" /> Corporate</label>
              </div>

              <div className="button-wrap">
                <button className="join-btn">be a member</button>
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
