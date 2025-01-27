module.exports = (io) => {
  // In-memory task list
  let tasks = [];

  // Handle client connections
  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    // Send the initial list of tasks to the connected client
    socket.emit("initTasks", tasks);

    // Handle adding a new task
    socket.on("addTask", (data) => {
      const newTask = {
        id: Date.now().toString(),
        title: data.title,
        isCompleted: false,
      };
      tasks.push(newTask);

      // Broadcast the new task to all clients
      io.emit("taskAdded", newTask);
    });

    // Handle completing a task
    socket.on("completeTask", (taskId) => {
      tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      );
      const updatedTask = tasks.find((task) => task.id === taskId);

      // Broadcast the updated task to all clients
      io.emit("taskUpdated", updatedTask);
    });

    // Handle deleting a task
    socket.on("deleteTask", (taskId) => {
      tasks = tasks.filter((task) => task.id !== taskId);

      // Broadcast the deletion to all clients
      io.emit("taskDeleted", taskId);
    });

    // Handle client disconnections
    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
};
