import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    ytLink: "",
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [editProjectData, setEditProjectData] = useState({
    name: "",
    description: "",
    ytLink: "",
    photo: null,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:4080/api/projects");
      const data = Array.isArray(res.data) ? res.data : res.data.projects;
      setProjects(data || []);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      setProjects([]);
    }
  };

  const handleAddProject = async () => {
    const { name, description, ytLink, photo } = newProject;
    if (!name || !description || !photo) return alert("All fields including image are required.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("ytLink", ytLink);
    formData.append("photo", photo);

    try {
      const res = await axios.post("http://localhost:4080/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProjects((prev) => [...prev, res.data]);
      setNewProject({ name: "", description: "", ytLink: "", photo: null });
      setShowAddForm(false);
    } catch (err) {
      console.error("Add error:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`http://localhost:4080/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj._id);
    setEditProjectData({
      name: proj.name,
      description: proj.description,
      ytLink: proj.ytLink,
      photo: null,
    });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editProjectData.name);
    formData.append("description", editProjectData.description);
    formData.append("ytLink", editProjectData.ytLink);
    if (editProjectData.photo) formData.append("photo", editProjectData.photo);

    try {
      const res = await axios.put(
        `http://localhost:4080/api/projects/${editingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProjects((prev) =>
        prev.map((p) => (p._id === editingId ? res.data : p))
      );
      setEditingId(null);
      setEditProjectData({ name: "", description: "", ytLink: "", photo: null });
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const filteredProjects = Array.isArray(projects)
    ? projects.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    : [];

  const renderTable = (list, title) => (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-[#154360] px-4 py-2">{title}</h2>
      <table className="min-w-full text-sm table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Link</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((proj) => (
            <React.Fragment key={proj._id}>
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{proj.name}</td>
                <td className="px-4 py-2">{proj.description.substring(0, 100)}...</td>
                <td className="px-4 py-2">
                  <a href={proj.ytLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit</a>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(proj)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(proj._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>

              {editingId === proj._id && (
                <tr className="bg-gray-50">
                  <td colSpan={4} className="px-6 py-6">
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editProjectData.name}
                        onChange={(e) => setEditProjectData({ ...editProjectData, name: e.target.value })}
                        placeholder="Title"
                        className="border px-4 py-2 rounded w-full"
                      />
                      <textarea
                        value={editProjectData.description}
                        onChange={(e) => setEditProjectData({ ...editProjectData, description: e.target.value })}
                        placeholder="Description"
                        rows={6}
                        className="border px-4 py-2 rounded w-full"
                      />
                      <input
                        type="text"
                        value={editProjectData.ytLink}
                        onChange={(e) => setEditProjectData({ ...editProjectData, ytLink: e.target.value })}
                        placeholder="YouTube Link"
                        className="border px-4 py-2 rounded w-full"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditProjectData({ ...editProjectData, photo: e.target.files[0] })}
                        className="border px-4 py-2 rounded w-full"
                      />
                      <div className="flex gap-4">
                        <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow p-6 rounded text-center">
            <h2 className="text-3xl font-bold text-[#154360]">{projects.length}</h2>
            <p className="text-gray-600 mt-1">Total Projects</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 mt-10">
          <h1 className="text-2xl font-bold text-[#154360]">Projects Management</h1>
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
              {showAddForm ? "Close Form" : "Add Project"}
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4 text-[#154360]">Add New Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="border px-4 py-2 rounded w-full"
              />
              <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={6}
                className="border px-4 py-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Link"
                value={newProject.ytLink}
                onChange={(e) => setNewProject({ ...newProject, ytLink: e.target.value })}
                className="border px-4 py-2 rounded w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewProject({ ...newProject, photo: e.target.files[0] })}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <button
              onClick={handleAddProject}
              className="mt-4 bg-[#154360] text-white px-4 py-2 rounded hover:bg-[#1a5276]"
            >
              Add Project
            </button>
          </div>
        )}

        {filteredProjects.length > 0
          ? renderTable(filteredProjects, "Projects List")
          : <p className="text-gray-500 italic">No projects available.</p>}
      </div>
    </div>
  );
}
