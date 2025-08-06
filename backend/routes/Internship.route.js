const express = require("express");
const router = express.Router();
const {
  addInternship,
  getInternships,
  getGroupedByBatch,
  updateInternship,
  deleteInternship
} = require("../controllers/Internship.controller");

router.post("/", addInternship);

router.get("/", getInternships);

router.get("/grouped", getGroupedByBatch);

router.put("/:id", updateInternship);

router.delete("/:id", deleteInternship);

module.exports = router;