const express = require("express");
const router = express.Router();

// In-Memory-Datenbank
let todos = [];
const limit = 5;

// Route: Alle Todos abrufen mit Pagination
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Standardwert 1

  // Start- und Endindex basierend auf Seite und Limit
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedTodos = todos.slice(startIndex, endIndex);

  res.json({
    todos: paginatedTodos,
    totalTodos: todos.length,
    currentPage: page,
    totalPages: Math.ceil(todos.length / limit),
  });
});

// Route: Todo hinzufügen
router.post("/", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Route: Todo löschen
router.delete("/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
