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
import { CSVLink } from "react-csv";

export default function AdminIntern() {
  const [interns, setInterns] = useState([]);
  const [expandedBatch, setExpandedBatch] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newIntern, setNewIntern] = useState({
    name: "",
    college: "",
    domain: "",
    batch: "",
  });
  const [editingInternId, setEditingInternId] = useState(null);
  const [editInternData, setEditInternData] = useState({
    name: "",
    college: "",
    domain: "",
  });

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      const res = await axios.get("http://localhost:4080/api/students");
      setInterns(res.data);
    } catch (err) {
      console.error("Error fetching interns:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this intern?")) return;
    try {
      await axios.delete(`http://localhost:4080/api/students/${id}`);
      fetchInterns();
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete.");
    }
  };

  const toggleBatch = (batch) => {
    setExpandedBatch(expandedBatch === batch ? null : batch);
  };

  const handleAddIntern = async () => {
    if (
      !newIntern.name ||
      !newIntern.college ||
      !newIntern.domain ||
      !newIntern.batch
    )
      return;
    try {
      await axios.post("http://localhost:4080/api/students", newIntern);
      setNewIntern({ name: "", college: "", domain: "", batch: "" });
      setShowAddForm(false);
      fetchInterns();
    } catch (err) {
      console.error("Add error:", err.message);
    }
  };

  const handleEdit = (intern) => {
    setEditingInternId(intern._id);
    setEditInternData({
      name: intern.name,
      college: intern.college,
      domain: intern.domain,
    });
  };

  const handleUpdateIntern = async () => {
    try {
      await axios.put(
        `http://localhost:4080/api/students/${editingInternId}`,
        editInternData
      );
      setEditingInternId(null);
      setEditInternData({ name: "", college: "", domain: "" });
      fetchInterns();
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  const groupedByBatch = interns.reduce((acc, intern) => {
    if (
      intern.name.toLowerCase().includes(search.toLowerCase()) ||
      intern.domain.toLowerCase().includes(search.toLowerCase())
    ) {
      acc[intern.batch] = acc[intern.batch] || [];
      acc[intern.batch].push(intern);
    }
    return acc;
  }, {});

  const totalInterns = interns.length;
  const uniqueBatches = [...new Set(interns.map((i) => i.batch))];
  const uniqueDomains = [...new Set(interns.map((i) => i.domain))];

  const domainData = Object.entries(
    interns.reduce((acc, { domain }) => {
      acc[domain] = (acc[domain] || 0) + 1;
      return acc;
    }, {})
  ).map(([domain, count]) => ({ name: domain, value: count }));

  const batchData = Object.entries(
    interns.reduce((acc, { batch }) => {
      acc[batch] = (acc[batch] || 0) + 1;
      return acc;
    }, {})
  ).map(([batch, count]) => ({ name: batch, value: count }));

  const COLORS = [
    "#154360",
    "#2980B9",
    "#7FB3D5",
    "#85C1E9",
    "#AED6F1",
    "#D6EAF8",
  ];

  const [selectedFields, setSelectedFields] = useState([
    "name",
    "college",
    "domain",
    "batch",
  ]);

  const handleFieldToggle = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const filteredInterns = interns.map((intern) => {
    const filtered = {};
    selectedFields.forEach((field) => {
      filtered[field] = intern[field];
    });
    return filtered;
  });

  const handlePDFDownload = () => {
    const { jsPDF } = require("jspdf");
    require("jspdf-autotable");
    const doc = new jsPDF();

    const headers = selectedFields.map((field) => field.toUpperCase());
    const rows = interns.map((intern) => selectedFields.map((f) => intern[f]));

    doc.text("Interns Report", 14, 15);
    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20,
    });
    doc.save(`interns_${new Date().toISOString()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* === Summary Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-[#154360]">
              {totalInterns}
            </h2>
            <p className="text-gray-500 mt-1">Total Interns</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-[#154360]">
              {uniqueBatches.length}
            </h2>
            <p className="text-gray-500 mt-1">Unique Batches</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-[#154360]">
              {uniqueDomains.length}
            </h2>
            <p className="text-gray-500 mt-1">Unique Domains</p>
          </div>
        </div>

        {/* === Graphs Section === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#154360]">
              Interns by Domain
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={domainData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {domainData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#154360]">
              Interns by Batch
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={batchData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#154360" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* === Filter + Export Section === */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-[#154360]">
            Intern Management
          </h1>

          <div className="flex flex-col items-start md:items-center gap-2 w-full md:w-auto">
            {/* === Top Controls (Search, Export, Add, Filter Toggle) === */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search Box */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or domain..."
                className="border border-gray-300 px-4 py-2 rounded w-64"
              />

              {/* Toggle Filter Icon Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-[#154360] hover:text-[#1a5276] text-xl"
                title="Toggle filters"
              >
                🧩
              </button>

              {/* Export CSV */}
              <CSVLink
                onClick={(e) => {
                  if (selectedFields.length === 0) {
                    e.preventDefault();
                    alert("Please select at least one field to export CSV.");
                    setShowFilters(true);
                  }
                }}
                data={filteredInterns.map((intern) =>
                  Object.fromEntries(
                    Object.entries(intern).filter(([key]) =>
                      selectedFields.includes(key)
                    )
                  )
                )}
                filename={`filtered_interns_${new Date().toISOString()}.csv`}
                className="bg-[#154360] text-white px-4 py-2 rounded hover:bg-[#1a5276]"
              >
                Export CSV
              </CSVLink>

              {/* Add Intern Button */}
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {showAddForm ? "Close Form" : "Add Intern"}
              </button>
            </div>

            {/* === Field Filters (rendered below the button row) === */}
            {showFilters && (
              <div className="flex flex-wrap gap-4 mt-2">
                {["name", "college", "domain", "batch"].map((field) => (
                  <label key={field} className="text-sm">
                    <input
                      type="checkbox"
                      className="mr-1"
                      checked={selectedFields.includes(field)}
                      onChange={() => handleFieldToggle(field)}
                    />
                    {field}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* === Add Intern Form (Glassmorphic) === */}
        {showAddForm && (
          <div className="backdrop-blur-md bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg max-w-xl mx-auto mb-6">
            <h3 className="text-xl font-semibold text-[#154360] mb-4">
              Add New Intern
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 rounded border"
                value={newIntern.name}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="College"
                className="px-4 py-2 rounded border"
                value={newIntern.college}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, college: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Domain"
                className="px-4 py-2 rounded border"
                value={newIntern.domain}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, domain: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Batch"
                className="px-4 py-2 rounded border"
                value={newIntern.batch}
                onChange={(e) =>
                  setNewIntern({ ...newIntern, batch: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleAddIntern}
              className="mt-4 bg-[#154360] text-white px-4 py-2 rounded hover:bg-[#1a5276]"
            >
              Add Intern
            </button>
          </div>
        )}

        {/* === Interns Table === */}
        {Object.entries(groupedByBatch).map(([batch, batchInterns]) => (
          <div key={batch} className="mb-6">
            <button
              onClick={() => toggleBatch(batch)}
              className="w-full text-left bg-blue-100 text-blue-800 px-6 py-3 rounded shadow mb-1 font-medium"
            >
              {batch}
              <span className="float-right">
                {expandedBatch === batch ? "▲" : "▼"}
              </span>
            </button>

            {expandedBatch === batch && (
              <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm table-auto">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">College</th>
                      <th className="px-4 py-3 text-left">Domain</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchInterns.map((intern) => (
                      <tr
                        key={intern._id}
                        className="border-t hover:bg-gray-50"
                      >
                        {editingInternId === intern._id ? (
                          <>
                            <td className="px-4 py-2">
                              <input
                                value={editInternData.name}
                                onChange={(e) =>
                                  setEditInternData({
                                    ...editInternData,
                                    name: e.target.value,
                                  })
                                }
                                className="border px-2 py-1 rounded"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                value={editInternData.college}
                                onChange={(e) =>
                                  setEditInternData({
                                    ...editInternData,
                                    college: e.target.value,
                                  })
                                }
                                className="border px-2 py-1 rounded"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                value={editInternData.domain}
                                onChange={(e) =>
                                  setEditInternData({
                                    ...editInternData,
                                    domain: e.target.value,
                                  })
                                }
                                className="border px-2 py-1 rounded"
                              />
                            </td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                onClick={handleUpdateIntern}
                                className="text-green-600 hover:underline"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingInternId(null)}
                                className="text-gray-500 hover:underline"
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-2">{intern.name}</td>
                            <td className="px-4 py-2">{intern.college}</td>
                            <td className="px-4 py-2">{intern.domain}</td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                onClick={() => handleEdit(intern)}
                                className="text-blue-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(intern._id)}
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
            )}
          </div>
        ))}

        {Object.keys(groupedByBatch).length === 0 && (
          <p className="text-center text-gray-500 mt-10">No interns found.</p>
        )}
      </div>
    </div>
  );
}
