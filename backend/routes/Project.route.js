const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/Project.controller");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../frontend/BVM/public/projects"),
  filename: (req, file, cb) => {
    // Always use timestamp + original filename to avoid collisions
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9-_]/g, "");
    cb(null, `${Date.now()}_${name}${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getAllProjects);
router.post("/", upload.single("photo"), createProject);
router.put("/:id", upload.single("photo"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
