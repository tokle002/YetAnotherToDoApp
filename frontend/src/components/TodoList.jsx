import TodoItem from "./TodoItem";
import styles from "./todolist.module.css";
import React, { useEffect } from "react";

export default function TodoList({ todos, setTodos }) {
  useEffect(() => {
    const loadTodos = async () => {
      try {
        // Fetch Todos vom Backend
        const response = await fetch("http://localhost:3000/todos");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Todos");
        }
        const todosFromServer = await response.json();
        setTodos(todosFromServer); // Setze die Todos im Zustand
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    loadTodos();
  }, [setTodos]);

  return (
    <div className={styles.list}>
      {todos.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          item={todoItem.text}
          todos={todos}
          setTodos={setTodos}
          id={todoItem.id}
        />
      ))}
    </div>
  );
}
