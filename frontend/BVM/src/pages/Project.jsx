import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import amrImg from "../assets/amr.png";
import asrsImg from "../assets/asrs.png";
import ChatbotButton from "../components/ChatbotButton";

const Projects = () => {
  return (
    <div className="font-serif text-gray-900 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-extrabold text-center mb-16 text-blue-900 drop-shadow-md">
            Our Projects
          </h1>

          {/* Project 1 */}
          <div className="md:flex items-center mb-20 gap-10 bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-semibold mb-4 text-blue-700">
                Autonomous Mobile Robot
              </h2>
              <p className="text-lg text-justify text-gray-700 leading-relaxed">
                Autonomous Mobile Robots (AMRs) have emerged as indispensable assets in the realm of digital manufacturing, revolutionizing the way factories operate and enhancing overall efficiency.
                These robots are equipped with advanced sensors, navigation systems, and decision-making algorithms, enabling them to navigate dynamic environments, interact with machinery, and perform various tasks without human intervention.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={amrImg}
                alt="Autonomous Mobile Robot"
                className="w-full max-w-md rounded-xl object-contain grayscale hover:grayscale-0 shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Project 2 */}
          <div className="md:flex items-center gap-10 flex-row-reverse bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-semibold mb-4 text-blue-700">
                Automated Storage and Retrieval System (AS/RS)
              </h2>
              <p className="text-lg text-justify text-gray-700 leading-relaxed">
                Automated Storage and Retrieval Systems (AS/RS) are sophisticated material handling solutions that streamline warehouse operations by automating the storage and retrieval of goods.
                These systems leverage advanced technology, such as robotics, conveyors, and software control systems, to optimize inventory management, enhance efficiency, and maximize space utilization in warehouses and distribution centers.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={asrsImg}
                alt="AS/RS"
                className="w-full max-w-md rounded-xl object-contain grayscale hover:grayscale-0 shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <ChatbotButton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
