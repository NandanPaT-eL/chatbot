const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/Team.controller");

// Configure multer to save to frontend/public/team
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../frontend/BVM/public/team"),
  filename: (req, file, cb) => {
    const name = req.body.name.toLowerCase().replace(/ /g, "");
    cb(null, name + ".jpg");
  },
});
const upload = multer({ storage });

router.get("/", getAllTeamMembers);
router.post("/", upload.single("photo"), createTeamMember);
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

module.exports = router;