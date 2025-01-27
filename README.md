# Real-Time Task Collaboration App

This is a simple **React + Socket.IO** application that allows multiple users to manage a shared task list in real time. Any changes (adding, completing, or deleting tasks) are instantly broadcast to all connected clients—no need to refresh the page.

---

## Table of Contents

1. [Solution Overview](#solution-overview)
2. [Thought Process](#thought-process)
3. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Running the Server and Client](#running-the-server-and-client)
4. [Deployment](#deployment)

---

## Solution Overview

- **Frontend**: A React application that manages state for tasks and renders the UI.
- **Backend**: A Node.js/Express server that uses Socket.IO to provide real-time communication.
- **Communication**: WebSockets via Socket.IO. When one client performs an action (add, complete, delete), the server updates its in-memory array of tasks and broadcasts changes to all connected clients.

### Features

- **Add a Task**: Enter a title and click **Add**. All connected clients immediately see the new task.
- **Complete a Task**: Mark the task as complete; instantly updates everywhere.
- **Delete a Task**: Remove the task from the shared list for all users.

---

## Thought Process

1. **Design the Data Flow**
   - Tasks are stored on the server in an in-memory array.
   - Each client receives the full list on connect (`"initTasks"`).
   - Any additions, updates, or deletions are broadcast to all connected clients.
2. **Socket.IO Events**
   - **Client → Server**:
     - `addTask` (with task title)
     - `completeTask` (with task ID)
     - `deleteTask` (with task ID)
   - **Server → Clients**:
     - `initTasks` (full list when a client connects)
     - `taskAdded`
     - `taskUpdated`
     - `taskDeleted`
3. **React Frontend**
   - Maintains a `tasks` state.
   - Listens for server events to update the UI in real time.
   - Renders reusable components (`TaskInput`, `TaskList`, `TaskItem`) for user actions
4. **Styling**
   - Uses **Tailwind CSS (v3.3)** for styling.
   - Creates a clean, minimal UI that centers a white card on a light-gray background

---

## Getting Started

### Installation

1. **Clone** this repository.
2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```
3. **Install client dependencies**:
   ```bash
   cd client
   npm install
   ```

### Running the Server and Client

1. Navigate to the project root (where the `client` and `server` folders are located).
2. Start both the server and client simultaneously using `concurrently`:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 in your browser to access the app.

## Deployment

### Frontend

The frontend of the application is deployed on **Vercel** and can be accessed at:  
[https://bldr-eight.vercel.app](https://bldr-eight.vercel.app)

### Backend

The backend is deployed on **Render** at:  
[https://bldr.onrender.com](https://bldr.onrender.com)

### Note About Backend Inactivity

The backend is hosted on Render’s free tier, which goes into a "sleep" state after 15 minutes of inactivity. When this happens:

- The first request to the backend will take up to **50 seconds** to process due to a "cold start."
- After the backend "wakes up," subsequent requests will perform normally.

If you experience a delay when interacting with the app for the first time, this is expected behavior.
