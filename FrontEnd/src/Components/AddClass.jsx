/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClassContext } from "../Context/ClassContext";
import axios from "axios";

const AddClass = () => {
  const { departments, setClasses } = useContext(ClassContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !department) {
      alert("Please fill in all fields.");
      return;
    }

    const newClass = { name, departmentId: department }; // Corrected to 'departmentId'
    try {
      await axios.post("http://localhost:5002/api/classes", newClass);

      // Fetch the updated classes after adding
      const response = await axios.get("http://localhost:5002/api/classes");
      setClasses(response.data); // Update the context with new class data

      navigate("/"); // Navigate back to the class list
    } catch (error) {
      console.error(
        "Error adding class:",
        error.response?.data || error.message
      );
      alert("Failed to add class. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-3xl font-semibold mb-6 text-white">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-white"
          >
            Class Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-lg font-medium text-white"
          >
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="text-black" value="">
              Select Department
            </option>
            {departments.map((dept) => (
              <option className="text-black" key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition"
        >
          Add Class
        </button>
        <button
          className="mt-3 w-full bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none transition"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddClass;
