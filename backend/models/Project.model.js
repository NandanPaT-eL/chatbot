const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  ytLink: {
    type: String,
    required: false
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;