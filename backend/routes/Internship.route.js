const express = require("express");
const router = express.Router();
const {
    addInternship,
    getInternships
} = require("../controllers/Internship.controller");

router.post("/", addInternship);
router.get("/", getInternships);

module.exports = router;