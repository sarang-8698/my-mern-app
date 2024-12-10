// models/Department.js
import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("Department", departmentSchema);

// Export the Department model
export default Department;
