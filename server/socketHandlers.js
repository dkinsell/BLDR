module.exports = (io) => {
  let tasks = [];

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.emit("initTasks", tasks);

    socket.on("addTask", (data) => {
      const newTask = {
        id: Date.now().toString(),
        title: data.title,
        isCompleted: false,
      };
      tasks.push(newTask);

      io.emit("taskAdded", newTask);
    });

    socket.on("completeTask", (taskId) => {
      tasks.map(
        (task) => (task.id = taskId ? { ...task, isCompleted: true } : task)
      );
      const updatedTask = tasks.find((task) => task.id === taskId);

      io.emit("taskUpdated", updatedTask);
    });

    socket.on("deleteTask", (taskId) => {
      tasks = tasks.filter((task) => task.id !== taskId);
      io.emit("taskDeleted", taskId);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
};
