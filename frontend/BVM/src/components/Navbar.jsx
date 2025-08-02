import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/CoDM.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const baseColor = "#154360";
  const hoverColor = "#1A5276";
  const bgColor = "#F4F6F7";

  const linkStyle = {
    color: baseColor,
    textDecoration: "none",
    padding: "0.5rem",
    fontWeight: "600",
    transition: "color 0.3s ease",
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 20,
        }}
        className="py-3 relative"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <img
            src={logo}
            alt="logo"
            style={{ height: "48px", width: "auto" }}
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-sm md:text-base">
            <Link
              to="/"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              HOME
            </Link>
            <Link
              to="#"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              LAYOUT
            </Link>
            <Link
              to="/internship"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              INTERNSHIPS
            </Link>
            <Link
              to="/projects"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              PROJECTS
            </Link>
            <Link
              to="/partners"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              PARTNERS
            </Link>
            <Link
              to="/team"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              OUR TEAM
            </Link>
            <Link
              to="/login"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              ADMIN
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            style={{ color: baseColor }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col px-6 pt-4 pb-4 space-y-2 text-sm bg-white border-t border-gray-300 shadow-md">
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = hoverColor)}
            onMouseOut={(e) => (e.target.style.color = baseColor)}
          >
            HOME
          </Link>
          <Link
            to="#"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = hoverColor)}
            onMouseOut={(e) => (e.target.style.color = baseColor)}
          >
            LAYOUT
          </Link>
          <Link
            to="/internship"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = hoverColor)}
            onMouseOut={(e) => (e.target.style.color = baseColor)}
          >
            INTERNSHIPS
          </Link>
          <Link
            to="/projects"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = hoverColor)}
            onMouseOut={(e) => (e.target.style.color = baseColor)}
          >
            PROJECTS
          </Link>
          <Link
            to="/partners"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = hoverColor)}
            onMouseOut={(e) => (e.target.style.color = baseColor)}
          >
            PARTNERS
          </Link>
          <Link
            to="/team"
            style={linkStyle}
            onMouseOver={(e) => (e.target.style.color = hoverColor)}
            onMouseOut={(e) => (e.target.style.color = baseColor)}
          >
            OUR TEAM
          </Link>
          <Link
              to="/login"
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = hoverColor)}
              onMouseOut={(e) => (e.target.style.color = baseColor)}
            >
              ADMIN
            </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
