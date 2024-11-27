import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home from './pages/Home';
import { About } from './pages/About';
import { Contact } from "./pages/Contact";
import  Register  from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import Dashboard  from "./pages/Dashboard";  
import Admin from "./pages/Admin";
import Rdashboard from "./pages/Rdashboard" 
import Recruiter from "./pages/Recruiter";
import RRegister from "./pages/r_register";

const App = () => {
  return (
    <> 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/admin" element={<Admin />} />
          <Route path="/Rdashboard" element={<Rdashboard />} />
          <Route path="/recruiter" element={<Recruiter />} /> {/* Recruiter login route */}
          <Route path="/r_register" element={<RRegister />} /> {/* Updated component */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
