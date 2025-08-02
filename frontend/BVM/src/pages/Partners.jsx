import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import elecon from "../assets/elecon.png";
import fsm from "../assets/fsm.png";
import ChatbotButton from "../components/ChatbotButton";

const Partners = () => {
  return (
    <div className="font-serif bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <h1 className="text-5xl font-extrabold text-center mb-16 text-blue-900 drop-shadow-md">
            Our Partners
          </h1>

          {/* Partner 1 */}
          <div className="md:flex items-center gap-10 bg-[linear-gradient(145deg,#0e3d45,#11535c)] rounded-3xl shadow-md p-8 mb-16 text-white">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-4" style={{ color: "#ffffff" }}>
                Elecon Engineering
              </h2>

              <p className="text-lg text-justify leading-relaxed">
                Elecon Engineering, a trailblazer since 1951 and founded by Late
                Shri Ishwarbhai B. Patel. Their journey began in manufacturing
                conveyor systems for the mining industry, and rapidly evolved
                into a key player in Material Handling Equipment related EPC
                projects across India. Today, Elecon stands tall as Asia's
                largest Industrial Gearbox Manufacturer from India, with a
                global footprint across Asia, Middle East, USA, UK, Europe, and
                Africa.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <img
                src={elecon}
                alt="Elecon Logo"
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>

          {/* Partner 2 */}
          <div className="md:flex items-center gap-10 flex-row-reverse bg-[linear-gradient(145deg,#0e3d45,#11535c)] rounded-3xl shadow-md p-8 text-white">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-4 parthead" style={{ color: "#ffffff" }}>
                Foundation for Smart Manufacturing - AIA - IIT Delhi
              </h2>
              <p className="text-lg text-justify leading-relaxed">
                Foundation for Smart Manufacturing (FSM) helps, supports, and
                develops Smart Manufacturing concepts for Indian Industry. FSM
                aims to provide immersive training experiences through live
                lectures, online learning, live labs & self-paced exercises on
                remotely accessible hardware. Their goal is to integrate smart
                tech into Indian industries and foster skill development.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <img
                src={fsm}
                alt="FSM Logo"
                className="h-32 w-auto object-contain"
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

export default Partners;
