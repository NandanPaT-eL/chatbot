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
    <div className="font-serif text-gray-900 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold border-b-2 border-blue-900 inline-block pb-2 text-blue-900">
            Center of Excellence for Digital Manufacturing
          </h1>
          <p className="mt-4 text-[16px] text-gray-700">
            To facilitate the transfer of emerging technologies from the lab to
            the manufacturing floor, enhancing productivity and efficiency.
          </p>
        </section>

        {/* Objectives */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">
            Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Innovation and Research",
              "Education and Skill Development",
              "Industry Collaboration",
              "Technology Transfer",
              "Sustainable Manufacturing",
            ].map((obj, idx) => (
              <div
                key={idx}
                className="bg-white border-l-4 border-blue-800 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{obj}</h3>
                <p className="text-gray-700 text-[15px] leading-relaxed">
                  {{
                    "Innovation and Research":
                      "To foster an environment where creativity meets technology, enabling the development of cutting-edge solutions in the field of smart manufacturing.",
                    "Education and Skill Development":
                      "To provide educational programs and training that prepare a new generation of engineers and technicians for the challenges of Industry 4.0.",
                    "Industry Collaboration":
                      "To collaborate with industry leaders to translate research into practical, scalable industrial solutions.",
                    "Technology Transfer":
                      "To facilitate the transfer of emerging technologies from the lab to the manufacturing floor, enhancing productivity and efficiency.",
                    "Sustainable Manufacturing":
                      "To lead in sustainable manufacturing practices that minimize environmental impact and promote circular economy principles.",
                  }[obj]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About BVM */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">
            About BVM
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 underline underline-offset-4">
                Mission
              </h3>
              <p className="mt-2 text-gray-700 text-[15px] leading-relaxed">
                BVM's mission encompasses several key elements: providing high-quality
                engineering education, fostering innovation and research, and
                contributing to societal development through renewable energy
                research and rural housing development.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 underline underline-offset-4">
                Vision
              </h3>
              <p className="mt-2 text-gray-700 text-[15px] leading-relaxed">
                BVM's vision revolves around becoming a premier institution in
                engineering education and research, recognized for its commitment to
                innovation, academic excellence, and societal impact.
              </p>
            </div>
          </div>
        </section>

        {/* Patron */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">
            Our Patron
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6 bg-blue-900 text-white p-6 rounded-xl shadow-lg">
            <img
              src={jash}
              alt="Mr Pratik Patel"
              className="w-36 h-36 object-cover border-2 border-white rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold">Mr. Pratik Patel</h3>
              <p className="mt-1">Chairman and Managing Director @ Jash Engineering Ltd.</p>
              <p className="mt-1">BE in Production, MBA Finance, 32 years of experience.</p>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-2">
            Partners
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <img
              src={elecon}
              alt="Elecon Engineering"
              className="h-20 bg-white shadow-md p-2 rounded-md"
            />
            <img
              src={fsm}
              alt="FSM"
              className="h-20 bg-white shadow-md p-2 rounded-md"
            />
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <ChatbotButton />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
