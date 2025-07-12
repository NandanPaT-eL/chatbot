const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");
require("./config/s3");

connectDB();

const facultyRoutes = require("./routes/faculty.route");
app.use("/api/faculty", facultyRoutes);

module.exports = app;