import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/CoDM.png";

const Footer = () => {
  return (
    <footer className="bg-black mt-16 pt-6 border-t text-center text-white text-[14px] space-y-2 pb-5">
      <img src={logo} alt="logo" className="h-12 w-auto mx-auto" />
      <div>© 2025 BVM CoE DM. All Rights Reserved.</div>
      <div className="flex justify-center gap-4">
        <Link to="https://www.linkedin.com/company/iitdaiafsm/" className="hover:underline">LinkedIn</Link>
        <Link to="https://youtu.be/Fl9z8rEJdvs?si=Al2DgGOBORzkk4KY" className="hover:underline">YouTube</Link>
      </div>
    </footer>
  );
};

export default Footer;
