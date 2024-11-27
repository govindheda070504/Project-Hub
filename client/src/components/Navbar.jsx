import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/" className="logo">Project Hub</NavLink>    
        </div>
        <nav>
          <ul className="nav-list">
            <li> <NavLink to="/" className="nav-items" activeClassName="active">Home</NavLink></li>
            <li> <NavLink to="/contact" className="nav-items" activeClassName="active">Contact</NavLink></li>
            <li> <NavLink to="/login" className="nav-items" activeClassName="active">Login</NavLink></li>
            <li> <NavLink to="/register" className="nav-items" activeClassName="active">Register</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
