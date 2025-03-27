import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const TaskForm = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription || !dueDate) {
      alert("Please fill all fields!");
      return;
    }

    const newTask = {
      taskName,
      taskDescription,
      dueDate,
      addedDate: new Date().toISOString().split("T")[0],
      completedDate: null,
      status: "Pending",
    };

    try {
      const response = await axios.post("http://localhost:5000/tasks", newTask);
      onTaskAdded(response.data);
      clearForm();
      navigate("/tasks"); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const clearForm = () => {
    setTaskName("");
    setTaskDescription("");
    setDueDate("");
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <button><Link to='/tasks'>view tasks</Link></button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            required
          />
        </div>

        <div className="form-group">
          <label>Task Description:</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
