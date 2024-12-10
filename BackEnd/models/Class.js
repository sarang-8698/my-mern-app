// models/Class.js
import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department", // Linking to the Department model
    required: true,
  },
});

const Class = mongoose.model("Class", classSchema);

// Export the Class model
export default Class;
