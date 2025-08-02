import React from "react";
import internshipPoster from "../assets/internship.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";

const Internship = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className="font-serif text-gray-900 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
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

        {/* Selected Students - Internship 2023 */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Selected Students: Internship from December 2023 to May 2024
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="border px-3 py-2">Sr. No.</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">College</th>
                  <th className="border px-3 py-2">Domain</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {[
                  [
                    "1",
                    "Hitakshi Mavani",
                    "Dr. Subhash Technical Campus",
                    "Machine Learning",
                  ],
                  [
                    "2",
                    "Koria Nidhi J",
                    "Dr. Subhash Technical Campus",
                    "Machine Learning",
                  ],
                  [
                    "3",
                    "Kush Patel",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Machine Learning",
                  ],
                  [
                    "4",
                    "Yash Roghelia",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Robotics",
                  ],
                  [
                    "5",
                    "Daksh Mandera",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Robotics",
                  ],
                  [
                    "6",
                    "Priyal Desai",
                    "Dharmsinh Desai University",
                    "Robotics",
                  ],
                  ["7", "Vaibhav Vora", "GCET", "Industrial IoT"],
                ].map(([sr, name, college, domain]) => (
                  <tr key={sr} className="hover:bg-blue-50">
                    <td className="border px-3 py-2">{sr}</td>
                    <td className="border px-3 py-2">{name}</td>
                    <td className="border px-3 py-2">{college}</td>
                    <td className="border px-3 py-2">{domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
            *Swipe left/right on smaller screens to view full table
          </p>
        </div>

        {/* Selected Students - Internship May to August 2024 */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Selected Students: Internship from May 2024 to August 2024
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="border px-3 py-2">Sr. No.</th>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">College</th>
                  <th className="border px-3 py-2">Domain</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {[
                  [
                    "1",
                    "Dushyant Singh Rathore",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Digital Twin",
                  ],
                  [
                    "2",
                    "Shoobham Parikh",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Digital Twin",
                  ],
                  [
                    "3",
                    "Aashutosh Premshankar Mishra",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Extended Reality",
                  ],
                  [
                    "4",
                    "Pratik Vipulkumar Prajapati",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Extended Reality",
                  ],
                  [
                    "5",
                    "Bhakti Patel",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Industrial IoT",
                  ],
                  [
                    "6",
                    "Aakriti",
                    "Meerut Institute of Engineering and Technology",
                    "Robotics",
                  ],
                  [
                    "7",
                    "Bhavya Jadav",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Robotics",
                  ],
                  [
                    "8",
                    "Rohit Gupta",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Robotics",
                  ],
                  [
                    "9",
                    "Dev P Bhatiya",
                    "Birla Vishvakarma Mahavidyalaya",
                    "Robotics",
                  ],
                ].map(([sr, name, college, domain]) => (
                  <tr key={sr} className="hover:bg-blue-50">
                    <td className="border px-3 py-2">{sr}</td>
                    <td className="border px-3 py-2">{name}</td>
                    <td className="border px-3 py-2">{college}</td>
                    <td className="border px-3 py-2">{domain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
            *Swipe left/right on smaller screens to view full table
          </p>
        </div>

        {/* Internship Poster */}
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
