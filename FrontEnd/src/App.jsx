/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ClassProvider } from "./Context/ClassContext"; // Import ClassProvider
import AddClass from "./Components/AddClass";
import EditClass from "./Components/EditClass";
import ClassList from "./Components/ClassList";

function App() {
  return (
    <ClassProvider>
      {" "}
      {/* Wrap everything inside ClassProvider */}
      <Router>
        <div className="container mx-auto p-5">
          <h1 className="text-center text-3xl font-bold mb-5">
            Class Management
          </h1>
          <Routes>
            <Route path="/" element={<ClassList />} />
            <Route path="/add" element={<AddClass />} />
            <Route path="/edit/:id" element={<EditClass />} />
          </Routes>
        </div>
      </Router>
    </ClassProvider>
  );
}

export default App;
