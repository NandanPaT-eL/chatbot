import React from "react";
import "./Home.css";
import jash from "../assets/jash.jpeg";
import elecon from "../assets/elecon.png";
import fsm from "../assets/fsm.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";

const Home = () => {
  return (
    <div className="font-serif text-gray-900 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 leading-relaxed text-justify">
        {/* Hero Section */}
        <section className="text-center space-y-4 mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold border-b pb-3">
            Center of Excellence for Digital Manufacturing
          </h1>
          <p className="text-base sm:text-lg">
            To facilitate the transfer of emerging technologies from the lab to
            the manufacturing floor, enhancing productivity and efficiency.
          </p>
        </section>

        {/* Objectives */}
        <section className="objective-section text-white">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-gray-400 pb-1 text-white">
            Objectives of Center of Excellence for Digital Manufacturing Lab
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Innovation and Research",
                desc: "To foster an environment where creativity meets technology, enabling the development of cutting-edge solutions in the field of smart manufacturing.",
              },
              {
                title: "Education and Skill Development",
                desc: "To provide educational programs and training that prepare a new generation of engineers and technicians for the challenges of Industry 4.0.",
              },
              {
                title: "Industry Collaboration",
                desc: "To collaborate with industry leaders to translate research into practical, scalable industrial solutions.",
              },
              {
                title: "Technology Transfer",
                desc: "To facilitate the transfer of emerging technologies from the lab to the manufacturing floor, enhancing productivity and efficiency.",
              },
              {
                title: "Sustainable Manufacturing",
                desc: "To lead in sustainable manufacturing practices that minimize environmental impact and promote circular economy principles.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-[#0e3d45] p-4 rounded-md shadow-md"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {title}
                </h3>
                <p className="text-sm text-white">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About BVM */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-gray-400 pb-1">
            About BVM
          </h2>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold underline underline-offset-4">
                Mission
              </h3>
              <p className="text-sm mt-2">
                BVM's mission encompasses several key elements: providing
                high-quality engineering education, fostering innovation and
                research, contributing to societal development through
                initiatives like renewable energy research and rural housing
                development, and maintaining governmental recognition and
                affiliations with esteemed institutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold underline underline-offset-4">
                Vision
              </h3>
              <p className="text-sm mt-2">
                BVM's vision revolves around becoming a premier institution in
                engineering education and research, recognized for its
                commitment to innovation, academic excellence, and societal
                impact — and maintaining its status as a respected entity within
                the educational landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Patron */}
        <section className="mt-12 text-white">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-gray-400 pb-1">
            Our Patron
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#0e3d45] shadow-lg rounded-md p-6">
            <img
              src={jash}
              alt="Mr Pratik Patel"
              className="w-32 h-32 sm:w-36 sm:h-36 object-cover border border-white rounded-md max-w-full"
            />
            <div className="text-left patron-name">
              <h3 className="text-lg sm:text-xl font-semibold font-serif">
                Mr. Pratik Patel
              </h3>
              <p className="text-sm mt-1 font-serif">
                Chairman and Managing Director @ Jash Engineering Ltd.
              </p>
              <p className="text-sm mt-1 font-serif">
                BE in Production, MBA Finance, 32 years of experience.
              </p>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b border-gray-400 pb-1">
            Partners
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-6">
            <img
              src={elecon}
              alt="Elecon Engineering"
              className="h-16 sm:h-20 border border-gray-300 p-2 max-w-full object-contain"
            />
            <img
              src={fsm}
              alt="IIT Delhi FSM"
              className="h-16 sm:h-20 border border-gray-300 p-2 max-w-full object-contain"
            />
            <ChatbotButton />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
