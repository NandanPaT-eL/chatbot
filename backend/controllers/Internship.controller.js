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
    res.status(500).json({ error: "Failed to add student", details: err.message });
  }
};

exports.getInternships = async (req, res) => {
  try {
    const { batch } = req.query;
    const query = batch ? { batch } : {};
    const students = await Internship.find(query).sort({ createdAt: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students", details: err.message });
  }
};

exports.getGroupedByBatch = async (req, res) => {
  try {
    const grouped = await Internship.aggregate([
      {
        $group: {
          _id: "$batch",
          students: {
            $push: {
              _id: "$_id",
              name: "$name",
              college: "$college",
              domain: "$domain",
              createdAt: "$createdAt",
            },
          },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch grouped data", details: err.message });
  }
};

exports.updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Internship.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Updated successfully", student: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update", details: err.message });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Internship.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Deleted successfully", student: deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete", details: err.message });
  }
};