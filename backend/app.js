const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config();

const studentRoutes = require("./routes/Internship.route");
const authRoutes = require("./routes/auth.route");

const app = express();

const allowedOrigins = ['http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60
  }
}));

app.use("/api/students", studentRoutes);
app.use("/auth", authRoutes);

module.exports = app;