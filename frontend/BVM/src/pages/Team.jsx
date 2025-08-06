import React, { useEffect, useState } from "react";
import ChatbotButton from "../components/ChatbotButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Team = () => {
  const [faculty, setFaculty] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get("http://localhost:4080/api/team");
        const data = response.data;

        setFaculty(data.filter((member) => member.type === "faculty"));
        setResearchers(data.filter((member) => member.type === "researcher"));
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const renderTeamSection = (title, team) => (
    <>
      <h1 className="text-3xl font-bold text-center mb-12 mt-20">{title}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {team.map(({ _id, name, role, photo }) => (
          <div key={_id} className="flex flex-col items-center text-center">
            <img
              src={`/team/${photo}`} // Accessing from public folder
              alt={name}
              className="h-48 w-48 rounded-full object-cover border-2 border-gray-200 mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/team/default.jpg"; // fallback image
              }}
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-700 text-[15px]">{role}</p>
          </div>
        ))}
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-serif text-gray-900 bg-gradient-to-br from-white via-blue-50 to-white min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-16">
        {renderTeamSection("Faculty", faculty)}
        {renderTeamSection("Researchers", researchers)}
        <ChatbotButton />
      </div>
      <Footer />
    </div>
  );
};

export default Team;