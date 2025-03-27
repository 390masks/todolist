import { useEffect, useState } from "react";
import axios from "axios";
import TaskItems from "./TaskItem";
import { Link } from "react-router-dom";



const TaskList = ({ taskAdded }) => {
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    fetchTasks();
  }, [taskAdded]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <button><Link to='/'>Back to Home</Link></button>
      {tasks.length === 0 ? (
        <p>No tasks added yet!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Added Date</th>
              <th>Due Date</th>
              <th>Completed Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <TaskItems
                key={task.id}
                task={task}
                index={index}
                fetchTasks={fetchTasks}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
