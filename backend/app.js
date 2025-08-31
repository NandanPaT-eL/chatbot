const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

// Route imports
const studentRoutes = require("./routes/Internship.route");
const authRoutes = require("./routes/auth.route");
const teamRoutes = require("./routes/team.route");
const projectRoutes = require("./routes/Project.route");

const app = express();

// CORS configuration
const allowedOrigins = [process.env.VITE_FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Static file serving (so frontend can directly access team/project images)
app.use("/team", express.static(path.join(__dirname, "../frontend/BVM/public/team")));
app.use("/projects", express.static(path.join(__dirname, "../frontend/BVM/public/projects")));

// Routes
app.use("/api/students", studentRoutes);
app.use("/auth", authRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/projects", projectRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running!" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
