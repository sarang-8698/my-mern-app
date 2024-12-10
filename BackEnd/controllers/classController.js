import Class from "../models/Class.js";
import Department from "../models/Department.js"; // Ensure this import is added

// Controller methods
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("departmentId");
    console.log("Classes fetched:", classes); // Debug log
    res.json(classes);
  } catch (err) {
    res.status(400).send("Error fetching classes");
    console.log(err);
  }
};

export const createClass = async (req, res) => {
  const { name, departmentId } = req.body;
  try {
    const newClass = new Class({ name, departmentId });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).send("Error creating class");
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, departmentId } = req.body;

  // Validate departmentId
  if (!departmentId) {
    return res.status(400).send("Department ID is required");
  }

  try {
    // Ensure that the departmentId is valid
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(400).send("Invalid department ID");
    }

    // Find and update the class
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, departmentId },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).send("Class not found");
    }

    res.json(updatedClass); // Return the updated class object
  } catch (err) {
    console.log(err);
    res.status(400).send("Error updating class");
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).send("Class not found");
    }
    res.json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(400).send("Error deleting class");
  }
};
