import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import amrImg from "../assets/amr.png";
import asrsImg from "../assets/asrs.png";
import ChatbotButton from "../components/ChatbotButton";

const Projects = () => {
  return (
    <div className="font-serif bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <h1 className="text-5xl font-extrabold text-center mb-16 text-blue-900 drop-shadow-md">
            Our Projects
          </h1>

          {/* Project 1: AMR */}
          <div className="md:flex items-center gap-10 bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
                Autonomous Mobile Robot
              </h2>
              <p className="text-lg text-justify leading-relaxed">
                Autonomous Mobile Robots (AMRs) have emerged as indispensable
                assets in the realm of digital manufacturing, revolutionizing
                the way factories operate and enhancing overall efficiency.
                These robots are equipped with advanced sensors, navigation
                systems, and decision-making algorithms, enabling them to
                navigate dynamic environments, interact with machinery, and
                perform various tasks without human intervention.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <div className="bg-white p-4 rounded-2xl shadow-inner">
                <img
                  src={amrImg}
                  alt="Autonomous Mobile Robot"
                  className="h-32 w-auto object-contain transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Project 2: AS/RS */}
          <div className="md:flex items-center gap-10 flex-row-reverse bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
                Automated Storage and Retrieval System (AS/RS)
              </h2>
              <p className="text-lg text-justify leading-relaxed">
                Automated Storage and Retrieval Systems (AS/RS) are
                sophisticated material handling solutions that streamline
                warehouse operations by automating the storage and retrieval of
                goods. These systems leverage advanced technology, such as
                robotics, conveyors, and software control systems, to optimize
                inventory management, enhance efficiency, and maximize space
                utilization in warehouses and distribution centers.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
              <div className="bg-white p-4 rounded-2xl shadow-inner">
                <img
                  src={asrsImg}
                  alt="AS/RS"
                  className="h-32 w-auto object-contain transition duration-300"
                />
              </div>
            </div>
          </div>

          {/* Project 3: MIRAC-PC */}
          <div className="bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
              Retrofitting MIRAC-PC Turning Center
            </h2>
            <p className="text-lg text-justify leading-relaxed">
              This comprehensive retrofit transforms the MIRAC-PC Turning Center
              through a mechanical upgrade replacing stepper motors with
              high-performance Siemens servo motors and integrating a pneumatic
              chuck. A deep system integration configures the Siemens 808D
              controller with an S7-1200 PLC and safety systems – including a
              safety curtain – establishing a modern control foundation.
              <br />
              <br />
              The digital upgrade includes an IIoT platform with ThingWorx and
              Kepware for real-time OPC UA communication, enabling predictive
              maintenance, remote diagnostics, and live visualization. A Digital
              Twin powered by Emulate3D delivers real-time simulation and logic
              validation, propelling the machine into the realm of smart
              manufacturing.
            </p>
          </div>

          {/* Project 4: TRIAC-PC */}
          <div className="bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
              Retrofitting TRIAC-PC Vertical Milling Machine
            </h2>
            <p className="text-lg text-justify leading-relaxed">
              The TRIAC-PC retrofit project replaces outdated hardware with
              Siemens servo motors and integrates a vertical automatic tool
              changer, enhancing machining flexibility. A Siemens 808D CNC
              controller combined with an S7-1200 PLC ensures high-precision
              control and safety system compatibility.
              <br />
              <br />
              This machine is integrated into a smart manufacturing ecosystem
              through OPC UA-enabled IIoT communication via Kepware and
              ThingWorx. Predictive maintenance, machine diagnostics, and live
              control/monitoring are enabled. The implementation of a Digital
              Twin using Emulate3D validates system logic and supports real-time
              simulation for smart operations.
            </p>
          </div>

          {/* Project 5: Assembly Station */}
          <div className="bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
              Assembly Station
            </h2>
            <p className="text-lg text-justify leading-relaxed">
              A hydraulic press specifically designed for assembly operations
              has been developed. Core control is handled by an OPC UA-enabled
              DELTA PLC, while precise stroke length feedback is provided by an
              LVDT. Operator safety is guaranteed with a safety curtain. To
              enable advanced capabilities, the press has been integrated into
              an IIoT platform (ThingWorx/Kepware using OPC UA), facilitating
              real-time data monitoring, predictive maintenance strategy
              implementation, remote diagnostics, and comprehensive machine
              visualization and control.
            </p>
          </div>

          {/* Project 6: Manual Inspection Station */}
          <div className="bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
              Manual Inspection Station
            </h2>
            <p className="text-lg text-justify leading-relaxed">
              This manual inspection station utilizes a Vernier Caliper
              interfaced with a PC via USB. The PC is connected to a central
              server, forming the foundation for its integration into an IIoT
              platform (ThingWorx/Kepware using OPC UA communication). The
              platform facilitates critical capabilities including real-time
              data monitoring, predictive maintenance strategies, remote
              diagnostics, and machine visualization/control.
            </p>
          </div>

          {/* Project 7: Performance Measuring Station */}
          <div className="bg-[#0e3d45] rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 mb-16 text-white">
            <h2 className="text-3xl font-semibold mb-4 text-white" style={{ color: "#ffffff" }}>
              Performance Measuring Station
            </h2>
            <p className="text-lg text-justify leading-relaxed">
              This performance measuring station predicts product end-of-life
              through sensor-driven machine learning. Fitted with requisite
              instrumentation (load cells, temperature sensors, etc.), it
              acquires test metrics under simulated operating conditions. As a
              node within the unified production system, it connects via
              standard OPC UA communication—identical to other stations—feeding
              data into centralized ML algorithms for lifespan modeling,
              reliability analysis, and failure forecasting.
            </p>
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
