import React, { useState, useEffect } from "react";
import { taskService } from "./services/api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError("Erreur lors du chargement des tâches");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError("Erreur lors de l'ajout");
    }
  };

  // Suppression d'une seule tâche
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  // Suppression de toutes les tâches
  const handleDeleteAllTasks = async () => {
    try {
      await taskService.deleteAllTasks();
      setTasks([]);
    } catch {
      setError("Erreur lors de la suppression de toutes les tâches");
    }
  };

  return (
    <div className="App">
      <h1>Gestion de tâches</h1>
      <div className="task-form">
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>
      <button onClick={handleDeleteAllTasks} className="delete-all-button">
        Supprimer toutes les tâches
      </button>
      <div className="task-list">
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
