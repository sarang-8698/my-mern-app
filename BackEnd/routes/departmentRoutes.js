// routes/departmentRoutes.js
import express from "express";
const router = express.Router();

// Import department controller functions
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

// Set up routes for departments
router.get("/", getDepartments);
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

// Export the router
export default router;
