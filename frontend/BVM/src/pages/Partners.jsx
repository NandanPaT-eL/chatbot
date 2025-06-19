import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import elecon from "../assets/elecon.png";
import fsm from "../assets/fsm.png";

const Partners = () => {
  return (
    <div className="bg-white text-black font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Partners</h1>

        {/* Partner 1 */}
        <div className="md:flex items-start mb-16 gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Elecon Engineering</h2>
            <p className="text-[15px] leading-relaxed text-justify">
              Elecon Engineering, a trailblazer since 1951 and was founded by Late Shri Ishwarbhai B. Patel.
              Elecon journey began in manufacturing conveyor systems for the mining industry, and rapidly evolved into a key player in Material Handling Equipment related EPC projects across India. Today, Elecon stands tall as Asia's largest Industrial Gearbox Manufacturer from India, with a global footprint across Asia, Middle East, USA, UK and other parts of Europe and also in Africa.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
            <img src={elecon} alt="Akaaish Mech" className="h-28 w-auto object-contain" />
          </div>
        </div>

        {/* Partner 2 */}
        <div className="md:flex items-start gap-8 flex-row-reverse">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">
              Foundation for Smart Manufacturing - AIA - IIT Delhi
            </h2>
            <p className="text-[15px] leading-relaxed text-justify">
              Foundation for Smart Manufacturing (FSM) helps, supports, and develops Smart Manufacturing concepts for Indian Industry to witness, ideate, and try out in their plants. FSM also aims for a holistic educational curriculum and skill-building program through a vibrant incubation and administrative environment.
              FSM Skills is a holistic platform for providing immersive training experience through Live lectures, Online learning, Live demonstrations, Live Labs & Self paced exercises on remotely accessible actual hardware.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
            <img src={fsm} alt="FSM Logo" className="h-28 w-auto object-contain" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Partners;
