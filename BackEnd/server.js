// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes using import syntax
import classRoutes from "./routes/classRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import connectDB from "./config/db.js"; // Import connectDB function

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic root route handler to avoid 404 error on '/'
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Set up the routes for classes and departments
app.use("/api/classes", classRoutes);
app.use("/api/departments", departmentRoutes);

// Connect to MongoDB using the connectDB function
connectDB().catch((err) => {
  console.error("MongoDB connection failed: ", err);
  process.exit(1); // Exit the process if the DB connection fails
});

// Define the server's listening port
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
