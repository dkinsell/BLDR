import { useEffect, useState } from "react";
import socket from "./socket";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Listen for the initial list of tasks from the server
    socket.on("initTasks", (initialTasks) => {
      setTasks(initialTasks);
    });

    // Listen for new tasks being added
    socket.on("taskAdded", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    // Listen for task updates
    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    });

    // Listen for tasks being deleted
    socket.on("taskDeleted", (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      socket.off("initTasks");
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const handleAddTask = (title) => {
    socket.emit("addTask", { title });
  };

  const handleCompleteTask = (taskId) => {
    socket.emit("completeTask", taskId);
  };

  const handleDeleteTask = (taskId) => {
    socket.emit("deleteTask", taskId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Task App</h1>

        <TaskInput onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default App;
