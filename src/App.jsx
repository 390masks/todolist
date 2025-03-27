import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import './index.css'

const App = () => {
  const [taskAdded, setTaskAdded] = useState(false);

  const handleTaskAdded = () => {
    setTaskAdded(!taskAdded);
  };

  return (
    <Router>
      <div className="app-container">
        <h1>TODO LIST</h1>
        <Routes>
          <Route path="/" element={<TaskForm onTaskAdded={handleTaskAdded} />} />
          <Route
            path="/tasks"
            element={<TaskList taskAdded={taskAdded} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
