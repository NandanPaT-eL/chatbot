import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import studentRoutes from "./routes/Internship.route.js";
import authRoutes from "./routes/auth.route.js";
import teamRoutes from "./routes/team.route.js";
import projectRoutes from "./routes/Project.route.js";

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set true if frontend is HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Serve static files from backend/public
app.use("/team", express.static(path.join(__dirname, "public/team")));
app.use("/projects", express.static(path.join(__dirname, "public/projects")));

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

// Export app for Vercel serverless
export default app;