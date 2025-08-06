import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    role: "",
    type: "faculty",
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [editFacultyData, setEditFacultyData] = useState({
    name: "",
    role: "",
    type: "faculty",
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await axios.get("http://localhost:4080/api/team");
      setFaculty(res.data);
    } catch (err) {
      console.error("Error fetching team:", err.message);
    }
  };

  const handleAddFaculty = async () => {
    const { name, role, type, file } = newFaculty;
    if (!name || !role || !file)
      return alert("All fields including photo are required.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("type", type);
    formData.append("photo", file);

    try {
      await axios.post("http://localhost:4080/api/team", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewFaculty({ name: "", role: "", type: "faculty", file: null });
      setShowAddForm(false);
      fetchFaculty();
    } catch (err) {
      console.error("Add error:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:4080/api/team/${id}`);
      fetchFaculty();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleEdit = (fac) => {
    setEditingId(fac._id);
    setEditFacultyData({
      name: fac.name,
      role: fac.role,
      type: fac.type,
    });
  };

  const handleUpdate = async () => {
    try {
      const photo = editFacultyData.name.toLowerCase().replace(/ /g, "") + ".jpg";
      await axios.put(`http://localhost:4080/api/team/${editingId}`, {
        ...editFacultyData,
        photo,
      });
      setEditingId(null);
      fetchFaculty();
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const filteredFaculty = faculty.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const facultyList = filteredFaculty.filter((f) => f.type === "faculty");
  const researcherList = filteredFaculty.filter((f) => f.type === "researcher");

  // === Dashboard Data ===
  const totalMembers = faculty.length;
  const facultyCount = facultyList.length;
  const researcherCount = researcherList.length;

  const roleCounts = faculty.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {});

  const roleData = Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count,
  }));

  const pieData = [
    { name: "Faculty", value: facultyCount },
    { name: "Researchers", value: researcherCount },
  ];

  const COLORS = ["#1F618D", "#76D7C4"];

  const renderTable = (list, title) => (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-[#154360] px-4 py-2">{title}</h2>
      <table className="min-w-full text-sm table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((fac) => (
            <tr key={fac._id} className="border-t hover:bg-gray-50">
              {editingId === fac._id ? (
                <>
                  <td className="px-4 py-2">
                    <input
                      value={editFacultyData.name}
                      onChange={(e) =>
                        setEditFacultyData({
                          ...editFacultyData,
                          name: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={editFacultyData.role}
                      onChange={(e) =>
                        setEditFacultyData({
                          ...editFacultyData,
                          role: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-500 italic">auto</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2">{fac.name}</td>
                  <td className="px-4 py-2">{fac.role}</td>
                  <td className="px-4 py-2 capitalize">{fac.type}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(fac)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(fac._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-6 rounded text-center">
            <h2 className="text-3xl font-bold text-[#154360]">{totalMembers}</h2>
            <p className="text-gray-600 mt-1">Total Members</p>
          </div>
          <div className="bg-white shadow p-6 rounded text-center">
            <h2 className="text-3xl font-bold text-[#154360]">{facultyCount}</h2>
            <p className="text-gray-600 mt-1">Faculty</p>
          </div>
          <div className="bg-white shadow p-6 rounded text-center">
            <h2 className="text-3xl font-bold text-[#154360]">{researcherCount}</h2>
            <p className="text-gray-600 mt-1">Researchers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow p-6 rounded">
            <h3 className="text-lg font-semibold text-[#154360] mb-4">
              Team Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h3 className="text-lg font-semibold text-[#154360] mb-4">
              Members by Role
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={roleData}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1F618D" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Search + Add */}
        <div className="flex justify-between items-center mb-6 mt-10">
          <h1 className="text-2xl font-bold text-[#154360]">
            Team Management
          </h1>
          <div className="flex gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 px-4 py-2 rounded w-64"
            />
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {showAddForm ? "Close Form" : "Add Member"}
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4 text-[#154360]">
              Add New Member
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newFaculty.name}
                onChange={(e) =>
                  setNewFaculty({ ...newFaculty, name: e.target.value })
                }
                className="border px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={newFaculty.role}
                onChange={(e) =>
                  setNewFaculty({ ...newFaculty, role: e.target.value })
                }
                className="border px-4 py-2 rounded"
              />
              <select
                value={newFaculty.type}
                onChange={(e) =>
                  setNewFaculty({ ...newFaculty, type: e.target.value })
                }
                className="border px-4 py-2 rounded"
              >
                <option value="faculty">Faculty</option>
                <option value="researcher">Researcher</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewFaculty({ ...newFaculty, file: e.target.files[0] })
                }
                className="border px-4 py-2 rounded"
              />
            </div>
            <button
              onClick={handleAddFaculty}
              className="mt-4 bg-[#154360] text-white px-4 py-2 rounded hover:bg-[#1a5276]"
            >
              Add Member
            </button>
          </div>
        )}

        {/* Tables */}
        {facultyList.length > 0 && renderTable(facultyList, "Faculty List")}
        {researcherList.length > 0 && renderTable(researcherList, "Researcher List")}
      </div>
    </div>
  );
}