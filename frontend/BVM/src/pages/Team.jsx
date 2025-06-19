import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import indrajit from "../assets/team/indrajit.jpg";
import vinay from "../assets/team/vinay.jpg";
import kdbhatt from "../assets/team/kdbhatt.jpg";
import alpesh from "../assets/team/alpesh.jpg";
import vijay from "../assets/team/vijay.jpg";
import ashish from "../assets/team/ashish.jpg";
import dhara from "../assets/team/dhara.jpg";
import kinjal from "../assets/team/kinjal.jpg";
import rakesh from "../assets/team/rakesh.jpg";
import hardik from "../assets/team/hardik.jpg";
import priyank from "../assets/team/priyank.jpg";
import dipak from "../assets/team/dipak.png";
import mehfuza from "../assets/team/mehfuza.png";
import anish from "../assets/team/anish.jpg";
import vishal from "../assets/team/vishal.jpg";
import jay from "../assets/team/jay.jpeg";
import keivalya from "../assets/team/keivalya.jpeg";
import ashutosh from "../assets/team/ashutosh.jpg";

const teamMembers = [
  {
    name: "Dr. Indrajit Patel",
    role: "Professor & Principal, Birla Vishwakarma Mahavidyalaya",
    photo: indrajit
  },
  {
    name: "Dr. Vinay J Patel",
    role: "Professor & HOD, Mechanical Engineering",
    photo: vinay
  },
  {
    name: "Prof. Kamlesh Dhansukhlal Bhatt",
    role: "Assistant Professor, Production Engineering",
    photo: kdbhatt
  },
  {
    name: "Prof. Alpeshkumar Damor",
    role: "Assistant Professor, Mechanical Engineering",
    photo: alpesh
  },
  {
    name: "Prof. Vijaypratap Singh",
    role: "Assistant Professor, Mechanical Engineering",
    photo: vijay
  },
  {
    name: "Dr. Ashish Maheshkumar Thakkar",
    role: "Assistant Professor, Mechanical Engineering",
    photo: ashish
  },
  {
    name: "Prof. Dhara Pradip Trivedi",
    role: "Assistant Professor, Mechanical Engineering",
    photo: dhara
  },
  {
    name: "Prof. Kinjal A. Patel",
    role: "Assistant Professor, Mechanical Engineering",
    photo: kinjal
  },
  {
    name: "Prof. Rakeshkumar Barot",
    role: "Assistant Professor, Mechanical Engineering",
    photo: rakesh
  },
  {
    name: "Dr. Hardik S. Beravala",
    role: "Assistant Professor, Production Engineering",
    photo: hardik
  },
  {
    name: "Prof. Priyank Bharatbhai Machhi",
    role: "Adhoc faculty, Mechanical Engineering",
    photo: priyank
  },
  {
    name: "Dr. Dipakkumar M Patel",
    role: "Professor, Electronics",
    photo: dipak
  },
  {
    name: "Dr. Mehfuza S. Holia",
    role: "Assistant Professor, Electronics",
    photo: mehfuza
  },
  {
    name: "Dr. Anishbhai A. Vahora",
    role: "Assistant Professor, Electronics & Communication",
    photo: anish
  },
  {
    name: "Prof. Vishal Pandya",
    role: "Assistant Professor, Mechanical Engineering",
    photo: vishal
  }
];

const teamResearch = [
{
    name: "Mr. Jaykumar Goswami",
    role: "Robotics, AR/VR, Digital Twin",
    photo: jay
  },
  {
    name: "Mr. Keivalya Pandya",
    role: "AI/ML/NLP, Robotics, IIoT",
    photo: keivalya
  },
  {
    name: "Mr. Ashutosh Babras",
    role: "Robotics, Mechatronics, IIoT",
    photo: ashutosh
  }
];

const Team = () => {
  return (
    <div className="font-serif text-[#000] bg-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Faculty</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map(({ name, role, photo }) => (
            <div key={name} className="flex flex-col items-center text-center">
              <img
                src={photo}
                alt={name}
                className="h-50 w-50 rounded-full object-cover border-2 border-gray-200 mb-4"
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-700 text-[15px]">{role}</p>
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-center mb-12 mt-20">Researchers</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamResearch.map(({ name, role, photo }) => (
            <div key={name} className="flex flex-col items-center text-center">
              <img
                src={photo}
                alt={name}
                className="h-50 w-50 rounded-full object-cover border-2 border-gray-200 mb-4"
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-700 text-[15px]">{role}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
