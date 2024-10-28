const express = require("express");
const router = express.Router();

// In-Memory-Datenbank
let todos = [];
const todosPerPage = 5;

// Route: Alle Todos abrufen mit Pagination
router.get("/", (req, res) => {
  res.json(todos);
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
