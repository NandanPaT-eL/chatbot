import { useNavigate } from "react-router-dom";
import logo from "../assets/CoDM.png";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-md z-50">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="h-10 w-auto" />
      </div>

      <div className="flex gap-4">
        <button
          className="text-[#154360] font-semibold hover:bg-[#EAF2F8] px-4 py-2 rounded transition-all"
          onClick={() => navigate("/admin")}
        >
          Interns
        </button>
        <button
          className="text-[#154360] font-semibold hover:bg-[#EAF2F8] px-4 py-2 rounded transition-all"
          onClick={() => navigate("../adminFaculty")}
        >
          Faculty
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
