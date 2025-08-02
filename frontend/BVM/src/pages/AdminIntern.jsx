import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";
import { useAuth } from "../components/AuthContext";

const AdminIntern = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    domain: "",
    batch: "",
  });

  useEffect(() => {
    const handleBack = () => {
      logout();
      navigate("/login", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [logout, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        srNo: Date.now(),
      };

      const res = await axios.post("http://localhost:4080/api/students", payload);
      console.log("Submitted:", res.data);
      alert("Student data saved successfully!");

      // Reset form
      setFormData({
        name: "",
        college: "",
        domain: "",
        batch: "",
      });
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to save data. Check console for details.");
    }
  };

  return (
    <div className="font-serif text-gray-900 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 leading-relaxed">
        <h1 className="text-[26px] font-bold text-center mb-6 border-b pb-3">
          Admin Panel: Add Internship Student
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto mt-6">
          <form onSubmit={handleSubmit} className="space-y-5 text-[15px]">
            <div>
              <label className="block mb-1 font-medium">Student Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter college name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Domain</label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="e.g. Robotics, Digital Twin"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Batch</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                placeholder="e.g. May 2025 - August 2025"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>

        <ChatbotButton />
      </div>

      <Footer />
    </div>
  );
};

export default AdminIntern;