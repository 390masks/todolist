import React from "react";
import axios from "axios";


const TaskItems = ({ task, index, fetchTasks }) => {
  
  const markAsCompleted = async () => {
    const today = new Date().toISOString().split("T")[0];
    const updatedTask = {
      ...task,
      status: today <= task.dueDate ? "Completed" : "Incomplete",
      completedDate: today,
    };

    try {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, updatedTask);
      fetchTasks(); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  
  const deleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${task.id}`);
        fetchTasks(); 
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{task.taskName}</td>
      <td>{task.taskDescription}</td>
      <td>{task.addedDate}</td>
      <td>{task.dueDate}</td>
      <td>{task.completedDate || "N/A"}</td>
      <td
        className={
          task.status === "Completed"
            ? "completed"
            : task.status === "Incomplete"
            ? "incomplete"
            : "pending"
        }
      >
        {task.status}
      </td>
      <td>
        {task.status !== "Completed" && task.status !== "Incomplete" && (
          <button className="complete-btn" onClick={markAsCompleted}>
            Mark Completed
          </button>
        )}
        <button className="delete-btn" onClick={deleteTask}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItems;
