/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClassContext } from "../Context/ClassContext";
import axios from "axios";

const EditClass = () => {
  const { id } = useParams();
  const { departments, classes, setClasses } = useContext(ClassContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const classToEdit = classes.find((cls) => cls._id === id);
    if (classToEdit) {
      setName(classToEdit.name);
      setDepartment(classToEdit.departmentId._id); // Ensure department is set correctly by ID
    }
  }, [id, classes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !department) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedClass = { name, department }; // Send department ID

    await axios.put(`http://localhost:5002/api/classes/${id}`, updatedClass);

    // Fetch the updated classes after editing
    const response = await axios.get("http://localhost:5002/api/classes");
    setClasses(response.data); // Update the context with the edited class

    navigate("/"); // Navigate back to the class list
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Edit Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Class Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <div>
          <label htmlFor="department" className="block">
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full p-2 border border-gray-300"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditClass;
