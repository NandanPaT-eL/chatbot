import React from "react";
import internshipPoster from "../assets/internship.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";

const Internship = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className="font-serif text-[#000] bg-white">
      {/* Navigation Bar */}
      <Navbar></Navbar>

      {/* Main Internship Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 leading-relaxed">
        <h1 className="text-[26px] font-bold text-center mb-6 border-b pb-3">
          Summer Internship Program 2025
        </h1>

        <p className="text-[16px] mb-4 text-justify">
          <strong>Birla Vishvakarma Mahavidyalaya (BVM)</strong>, in
          collaboration with
          <strong> IIT Delhi - AIA Foundation for Smart Manufacturing</strong>,
          is offering a 2-month mixed-mode internship (minimum 4 weeks on-site).
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Facilities for Interns
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-[15px] space-y-1">
              <li>One to One Mentorship</li>
              <li>3D Printers / Scanner</li>
              <li>Smart Manufacturing Kit Access</li>
              <li>IoT Hardware and Software</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Internship Domains</h2>
            <ul className="list-disc list-inside text-gray-700 text-[15px] space-y-1">
              <li>Robotics</li>
              <li>Industrial IoT</li>
              <li>Extended Reality</li>
              <li>Digital Twin</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-3">
          Stages of Internship
        </h2>
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          {[
            "Registration",
            "Short Listing",
            "Level 1 Learning",
            "Level 2 Technology Stream Learning",
            "Final Selection",
            "Project Allocation",
            "Internship Commencement",
          ].map((stage) => (
            <span
              key={stage}
              className="bg-blue-100 border border-blue-300 px-3 py-1 rounded"
            >
              {stage}
            </span>
          ))}
        </div>

        <div className="mt-6 text-[15px] space-y-2">
          <p>
            <strong>Last Date to Register:</strong> 16/05/2025
          </p>
          <p>
            <strong>Internship Start Date:</strong> 20/05/2025
          </p>
          <p>
            <strong>Deposit:</strong> ₹2000/- (refundable after completion)
          </p>
          <p>
            <strong>Certificate:</strong> Provided upon successful completion
          </p>
          <p>
            <strong>Eligibility:</strong> 3rd & 4th year students with minimum
            CGPA of 7.0
          </p>
        </div>

        <div className="mt-6">
          <p className="text-[14px]">
            For queries, contact:{" "}
            <a
              href="mailto:sm@bvmsengineering.ac.in"
              className="underline text-blue-600"
            >
              sm@bvmengineering.ac.in
            </a>
          </p>
        </div>

        <div className="mt-8">
          <img
            src={internshipPoster}
            alt="Internship Poster"
            className="w-full rounded shadow"
          />
        </div>
        <ChatbotButton />
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Internship;
