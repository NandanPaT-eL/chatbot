const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["faculty", "researcher"],
    required: true
  }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;