import React, { useState } from "react";
import jash from "../assets/jash.jpeg";
import elecon from "../assets/elecon.png";
import fsm from "../assets/fsm.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-serif text-[#000] bg-white">
      {/* Navigation Bar */}
      <Navbar></Navbar>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 leading-relaxed text-justify">
        {/* Hero Section */}
        <section className="text-center space-y-4 mb-8">
          <h1 className="text-[28px] font-bold border-b pb-3">
            Center of Excellence for Digital Manufacturing
          </h1>
          <p className="text-[16px]">
            To facilitate the transfer of emerging technologies from the lab to
            the manufacturing floor, enhancing productivity and efficiency.
          </p>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-[22px] font-semibold mb-4 border-b border-gray-400 pb-1">
            Objectives of Center of Excellence for Digital Manufacturing Lab
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Innovation and Research",
              "Education and Skill Development",
              "Industry Collaboration",
              "Technology Transfer",
              "Sustainable Manufacturing",
            ].map((obj) => (
              <div
                key={obj}
                className="bg-[#f9f9f9] border border-gray-300 p-4 rounded shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-[18px] font-semibold mb-2">{obj}</h3>
                <p className="text-[16px] text-gray-700">
                  {obj === "Innovation and Research" &&
                    "To foster an environment where creativity meets technology, enabling the development of cutting-edge solutions in the field of smart manufacturing."}
                  {obj === "Education and Skill Development" &&
                    "To provide educational programs and training that prepare a new generation of engineers and technicians for the challenges of Industry 4.0."}
                  {obj === "Industry Collaboration" &&
                    "To collaborate with industry leaders to translate research into practical, scalable industrial solutions."}
                  {obj === "Technology Transfer" &&
                    "To facilitate the transfer of emerging technologies from the lab to the manufacturing floor, enhancing productivity and efficiency."}
                  {obj === "Sustainable Manufacturing" &&
                    "To lead in sustainable manufacturing practices that minimize environmental impact and promote circular economy principles."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About BVM */}
        <section className="mt-12">
          <h2 className="text-[22px] font-semibold mb-4 border-b border-gray-400 pb-1">
            About BVM
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-[18px] font-semibold underline underline-offset-4">
                Mission
              </h3>
              <p className="text-[16px] text-gray-700 mt-2">
                BVM's mission encompasses several key elements: providing
                high-quality engineering education, fostering innovation and
                research, contributing to societal development through
                initiatives like renewable energy research and rural housing
                development, and maintaining governmental recognition and
                affiliations with esteemed institutions.
              </p>
            </div>
            <div>
              <h3 className="text-[18px] font-semibold underline underline-offset-4">
                Vision
              </h3>
              <p className="text-[16px] text-gray-700 mt-2">
                BVM's vision revolves around becoming a premier institution in
                engineering education and research, recognized for its
                commitment to innovation, academic excellence, and societal
                impact… and maintain its status as a respected entity within the
                educational landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Patron */}
        <section className="mt-12">
          <h2 className="text-[22px] font-semibold mb-4 border-b border-gray-400 pb-1">
            Our Patron
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={jash}
              alt="Mr Pratik Patel"
              className="border border-gray-400 p-1 rounded shadow w-32 h-32 object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">Mr. Pratik Patel</h3>
              <p className="text-gray-700 text-[16px]">
                Chairman and Managing Director @ Jash Engineering Ltd.
              </p>
              <p className="text-gray-600 text-[15px] mt-1">
                BE in Production, MBA Finance, 32 years of experience.
              </p>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="mt-12">
          <h2 className="text-[22px] font-semibold mb-4 border-b border-gray-400 pb-1">
            Partners
          </h2>
          <div className="gap-8 items-center flex flex-col md:flex-row">
            <img
              src={elecon}
              alt="Elecon Engineering"
              className="h-20 border border-gray-300 p-2"
            />
            <img
              src={fsm}
              alt="IIT Delhi FSM"
              className="h-20 border border-gray-300 p-2"
            />
            <ChatbotButton />
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
