const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
    index: true
  },
}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);
