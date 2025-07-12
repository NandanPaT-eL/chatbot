import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import amrImg from "../assets/amr.png";
import asrsImg from "../assets/asrs.png";
import ChatbotButton from "../components/ChatbotButton";

const Projects = () => {
  return (
    <div className="bg-white text-black font-sans">
      {/* Navigation Bar */}
      <Navbar></Navbar>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Our Projects</h1>

        {/* Project 1: Autonomous Mobile Robot */}
        <div className="md:flex items-center mb-16 gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">
              Autonomous Mobile Robot
            </h2>
            <p className="text-[15px] text-justify leading-relaxed">
              Autonomous Mobile Robots (AMRs) have emerged as indispensable
              assets in the realm of digital manufacturing, revolutionizing the
              way factories operate and enhancing overall efficiency. These
              robots are equipped with advanced sensors, navigation systems, and
              decision-making algorithms, enabling them to navigate dynamic
              environments, interact with machinery, and perform various tasks
              without human intervention.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={amrImg}
              alt="Autonomous Mobile Robot"
              className="max-w-sm w-full rounded shadow"
            />
          </div>
        </div>

        {/* Project 2: Automated Storage and Retrieval System */}
        <div className="md:flex items-center gap-8 flex-row-reverse">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">
              Automated Storage and Retrieval System (AS/RS)
            </h2>
            <p className="text-[15px] text-justify leading-relaxed">
              Automated Storage and Retrieval Systems (AS/RS) are sophisticated
              material handling solutions that streamline warehouse operations
              by automating the storage and retrieval of goods. These systems
              leverage advanced technology, such as robotics, conveyors, and
              software control systems, to optimize inventory management,
              enhance efficiency, and maximize space utilization in warehouses
              and distribution centers.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={asrsImg}
              alt="Automated Storage and Retrieval System"
              className="max-w-sm w-full rounded shadow"
            />
          </div>
        </div>
        <ChatbotButton />
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Projects;
