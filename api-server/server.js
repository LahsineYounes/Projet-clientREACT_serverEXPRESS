const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// instance de l'application Express
const app = express();
// Configuration du port
const PORT = process.env.PORT || 5050;

// Appliquer les middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Données mock
let tasks = [
  { id: 1, title: "Apprendre Express", completed: false },
  { id: 2, title: "Créer une API REST", completed: false },
];

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API opérationnelle" });
  //res.send("Hiiiiiiii World ! I'm YOUNES");
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Tâche non trouvée" });
  res.json(task);
});

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
// Supprimer une tâche par son id
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ error: "Tâche non trouvée" });
  }
  tasks.splice(index, 1);
  res.json({ message: "Tâche supprimée" });
});
// Supprimer toutes les tâches
app.delete("/api/tasks", (req, res) => {
  tasks = [];
  res.json({ message: "Toutes les tâches ont été supprimées" });
});

// Démarrer le serveur et écouter sur le port
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

const cors = require('cors');
app.use(cors({
  origin: ['younes-tp.vercel.app', 'localhost:3000'] // Remplacez par l'URL de votre frontend
}));