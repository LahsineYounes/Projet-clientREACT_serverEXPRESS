import axios from "axios";

//const API_URL = "http://localhost:5050/api"; // le port du backend
const API_URL = "younes-projet.vercel.app/api"; // le port du backend

// instance d'axios
const apiClient = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

export const taskService = {
    getAllTasks: async () => {
        const response = await apiClient.get("/tasks");
        return response.data;
    },
    createTask: async (taskData) => {
        const response = await apiClient.post("/tasks", taskData);
        return response.data;
    },
    // Supprimer une tâche par id
    deleteTask: async (id) => {
        const response = await apiClient.delete(`/tasks/${id}`);
        return response.data;
    },
    // Supprimer toutes les tâches
    deleteAllTasks: async () => {
        const response = await apiClient.delete("/tasks");
        return response.data;
    },
};
