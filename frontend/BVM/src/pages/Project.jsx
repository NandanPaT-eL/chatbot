import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotButton from "../components/ChatbotButton";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

// Instead of process.env.REACT_API_BACKEND
const API = import.meta.env.VITE_REACT_API_BACKEND;


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openProject, setOpenProject] = useState(null);

  const toggleProject = (id) => {
    setOpenProject(openProject === id ? null : id);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API}/api/projects`);
        setProjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="font-serif bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20">
          <h1 className="text-5xl font-extrabold text-center mb-16 text-blue-900 drop-shadow-md">
            Our Projects
          </h1>

          {projects.length === 0 && (
            <p className="text-center text-gray-600">No projects available.</p>
          )}

          {projects.map(({ _id, name, description, photo, ytLink }, index) => (
            <div key={_id} className="border border-gray-300 rounded-2xl shadow mb-6">
              {/* Collapsible Header */}
              <button
                onClick={() => toggleProject(_id)}
                className="w-full flex justify-between items-center px-6 py-4 bg-blue-100 text-gray-900 font-semibold rounded-t-2xl hover:bg-blue-200 transition"
              >
                <span>{name}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openProject === _id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expandable Content */}
              {openProject === _id && (
                <div className="px-6 py-6 bg-[#1f2937] text-white rounded-b-2xl space-y-4">
                  <div className="md:flex items-start gap-10">
                    {/* Description */}
                    <div className="md:w-2/3">
                      <p className="text-lg text-justify leading-relaxed">{description}</p>
                    </div>

                    {/* Photo */}
                    <div className="md:w-1/3 flex justify-center mt-4 md:mt-0">
                      <div className="bg-white p-4 rounded-2xl shadow-inner w-full flex justify-center">
                        <img
                          src={`/projects/${photo}`}
                          alt={name}
                          className="h-48 w-auto object-contain transition duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/projects/default.png";
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Video */}
                  {ytLink && (
                    <div className="mt-6">
                      <iframe
                        className="w-full aspect-video rounded-2xl shadow-lg"
                        style={{ minHeight: "400px" }}
                        src={ytLink.replace("watch?v=", "embed/")}
                        title={name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

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