const Internship = require("../models/Internship.model");

exports.addInternship = async (req, res) => {
  try {
    const { name, college, domain, batch } = req.body;

    if (!name || !college || !domain || !batch) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEntry = new Internship({ name, college, domain, batch });
    await newEntry.save();

    res.status(201).json({
      message: "Student added successfully",
      student: newEntry,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add student",
      details: err.message,
    });
  }
};

exports.getInternships = async (req, res) => {
  try {
    const { batch } = req.query;
    const query = batch ? { batch } : {};
    const students = await Internship.find(query).sort({ createdAt: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch students",
      details: err.message,
    });
  }
};
