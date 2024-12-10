// routes/classRoutes.js
import express from "express";
const router = express.Router();

// Import class controller functions
import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";

// Set up routes for classes
router.get("/", getClasses);
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass); // Ensure this matches the correct endpoint

// Export the router
export default router;
