const Project = require("../models/Project.model");
const path = require("path");
const fs = require("fs");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error("Get error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, ytLink } = req.body;
    const file = req.file;

    if (!name || !description || !file) {
      return res.status(400).json({ message: "Name, description, and photo are required." });
    }

    const photo = file.filename;
    const project = new Project({ name, description, ytLink, photo });
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { name, description, ytLink } = req.body;
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let photo = project.photo;
    if (req.file) {
      const oldPath = path.join(__dirname, "../../frontend/BVM/public/projects", project.photo);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      photo = req.file.filename; // correctly use new uploaded file
    }

    if (!name || !description) return res.status(400).json({ message: "Name and description are required." });

    const updated = await Project.findByIdAndUpdate(
      id,
      { name, description, ytLink, photo },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const photoPath = path.join(__dirname, "../../frontend/BVM/public/projects", project.photo);
    if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: "Project deleted successfully", deleted: project });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};