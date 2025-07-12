const express = require("express");
const router = express.Router();
const multer = require("multer");
const facultyController = require("../controllers/faculty.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addFaculty", upload.single("signature"), facultyController.addFaculty);

module.exports = router;

