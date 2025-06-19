import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/CoDM.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="py-3 shadow-md relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <img src={logo} alt="logo" className="h-12 w-auto" />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm md:text-base">
            <Link to="/" className="hover:underline">HOME</Link>
            <Link to="#" className="hover:underline">LAYOUT</Link>
            <Link to="/internship" className="hover:underline">INTERNSHIPS</Link>
            <Link to="/projects" className="hover:underline">PROJECTS</Link>
            <Link to="/partners" className="hover:underline">PARTNERS</Link>
            <Link to="/team" className="hover:underline">OUR TEAM</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-black">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-2 space-y-2 text-sm bg-white border-t shadow z-10">
          <Link to="/" className="block hover:underline">HOME</Link>
          <Link to="#" className="block hover:underline">LAYOUT</Link>
          <Link to="/internship" className="block hover:underline">INTERNSHIPS</Link>
          <Link to="/projects" className="block hover:underline">PROJECTS</Link>
          <Link to="/partners" className="block hover:underline">PARTNERS</Link>
          <Link to="#" className="block hover:underline">OUR TEAM</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;