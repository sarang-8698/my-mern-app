// controllers/departmentController.js
import Department from "../models/Department.js";

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new department
export const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a department
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const department = await Department.findById(id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    department.name = name || department.name;
    await department.save();
    res.json(department);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    await department.remove();
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
