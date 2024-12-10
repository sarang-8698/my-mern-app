/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]); // Ensure it's an empty array by default
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch all classes
    axios.get("http://localhost:5002/api/classes").then((response) => {
      if (Array.isArray(response.data)) {
        setClasses(response.data); // Only set if it's an array
      } else {
        console.error(
          "API response for classes is not an array:",
          response.data
        );
      }
    });

    // Fetch departments for the dropdown
    axios.get("http://localhost:5002/api/departments").then((response) => {
      if (Array.isArray(response.data)) {
        setDepartments(response.data); // Ensure departments is also an array
      } else {
        console.error(
          "API response for departments is not an array:",
          response.data
        );
      }
    });
  }, []);

  return (
    <ClassContext.Provider value={{ classes, setClasses, departments }}>
      {children}
    </ClassContext.Provider>
  );
};
