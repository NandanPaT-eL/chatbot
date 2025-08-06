const Team = require("../models/Faculty.model");
const path = require("path");
const fs = require("fs");

// GET all
const getAllTeamMembers = async (req, res) => {
  try {
    const team = await Team.find();
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST with file
const createTeamMember = async (req, res) => {
  try {
    const { name, role, type } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "Photo required" });

    const photo = file.filename;

    const newMember = new Team({ name, role, photo, type });
    await newMember.save();

    res.status(201).json(newMember);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create team member" });
  }
};

// PUT
const updateTeamMember = async (req, res) => {
  try {
    const { name, role, type } = req.body;
    const id = req.params.id;

    const photo = name.toLowerCase().replace(/ /g, "") + ".jpg";

    const updated = await Team.findByIdAndUpdate(
      id,
      { name, role, type, photo },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update team member" });
  }
};

// DELETE
const deleteTeamMember = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Team.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", deleted });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete team member" });
  }
};

module.exports = {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
