import TodoItem from "./TodoItem";
import styles from "./todolist.module.css";
import React, { useEffect } from "react";

export default function TodoList({
  todos,
  setTodos,
  currentPage,
  setTotalPages,
}) {
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/todos?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Todos");
        }

        const data = await response.json();

        setTodos(data.todos || []); // Setze Todos oder leeres Array, um undefined zu vermeiden
        setTotalPages(data.totalPages); // Setzt die Gesamtanzahl der Seiten
      } catch (error) {
        console.error("Fehler beim Abrufen der Todos:", error);
      }
    };

    loadTodos();
  }, [currentPage, todos, setTodos, setTotalPages]);

  return (
    <div className={styles.list}>
      {todos.map(
        (todoItem) =>
          // Überprüfe, ob das Todo-Item die richtige Struktur hat
          todoItem && todoItem.text ? (
            <TodoItem
              key={todoItem.id}
              item={todoItem.text}
              todos={todos}
              setTodos={setTodos}
              id={todoItem.id}
            />
          ) : null // Wenn das Todo nicht die richtige Struktur hat, gebe null zurück
      )}
    </div>
  );
}
