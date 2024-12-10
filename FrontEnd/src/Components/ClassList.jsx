/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { ClassContext } from "../Context/ClassContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClassList = () => {
  const { classes, setClasses } = useContext(ClassContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [classToEdit, setClassToEdit] = useState(null);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Fetch classes and departments on mount
  useEffect(() => {
    // Fetch Classes
    axios
      .get("/api/classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });

    // Fetch Departments (Example with 4 departments for now)
    const mockDepartments = [
      { _id: "1", name: "Science" },
      { _id: "2", name: "Mathematics" },
      { _id: "3", name: "Literature" },
      { _id: "4", name: "History" },
    ];
    setDepartments(mockDepartments); // Set mock departments to simulate the data
  }, [setClasses]);

  // Handle delete
  const handleDelete = (classId) => {
    axios
      .delete(`http://localhost:5002/api/classes/${classId}`)
      .then(() => {
        setClasses(classes.filter((classItem) => classItem._id !== classId));
      })
      .catch((error) => {
        console.error("Error deleting class:", error);
      });
  };

  // Handle edit
  const handleEdit = (classItem) => {
    setClassToEdit(classItem);
    setName(classItem.name);
    setDepartmentId(classItem.departmentId._id); // Assuming departmentId is populated
    setShowEditModal(true);
  };

  // Handle form submission for updating the class
  const handleUpdate = () => {
    axios
      .put(`http://localhost:5002/api/classes/${classToEdit._id}`, {
        name,
        departmentId,
      })
      .then((response) => {
        setClasses(
          classes.map((classItem) =>
            classItem._id === classToEdit._id ? response.data : classItem
          )
        );
        setShowEditModal(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        console.log(error);
      });
  };

  if (!Array.isArray(classes)) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-4xl font-semibold mb-6 text-white">Class List</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border-b border-gray-300 p-3 text-lg font-medium text-white">
              Class Name
            </th>
            <th className="border-b border-gray-300 p-3 text-lg font-medium text-white">
              Department
            </th>
            <th className="border-b border-gray-300 p-3 text-lg font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-white">
                No classes available
              </td>
            </tr>
          ) : (
            classes.map((classItem) => (
              <tr
                key={classItem._id}
                className="hover:bg-gray-50 transition-all"
              >
                <td className="border-b border-gray-200 p-3 text-white">
                  {classItem.name}
                </td>
                <td className="border-b border-gray-200 p-3 text-white">
                  {classItem.departmentId ? classItem.departmentId.name : "N/A"}
                </td>
                <td className="border-b border-gray-200 p-3">
                  <button
                    onClick={() => handleEdit(classItem)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(classItem._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-all duration-500">
          <div className="bg-white p-6 rounded-lg w-96 transform scale-100 transition-all duration-500 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Edit Class
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Class Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-lg p-2"
                  placeholder="Class Name"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-white">
                  Department
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-lg p-2"
                >
                  <option value="" disabled>
                    Select a Department
                  </option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-start">
        <button
          className="bg-blue-500 text-white border rounded-lg px-6 py-2 hover:bg-blue-600 focus:outline-none transition"
          onClick={() => navigate("/add")}
        >
          Add New Class
        </button>
      </div>
    </div>
  );
};

export default ClassList;
