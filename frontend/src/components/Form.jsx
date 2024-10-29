import { useState } from "react";
import styles from "./form.module.css";

export default function Form({
  changes,
  setChanges,
  todos,
  setTodos,
  setCurrentPage,
  totalPages,
  setTotalPages,
}) {
  const [todo, setTodo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim()) {
      try {
        const newTodo = { text: todo };

        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });

        if (!response.ok) {
          throw new Error("Fehler beim Hinzufügen des Todos");
        }

        const data = await response.json();

        // Update die Todos
        setTodos((prevTodos) => {
          const updatedTodos = [...prevTodos, data.todo];
          setTotalPages(Math.ceil(updatedTodos.length / 5));

          return updatedTodos;
        });
        setChanges(changes + 1);
        setCurrentPage(totalPages);

        setTodo(""); // Eingabefeld zurücksetzen
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Todos:", error);
      }
    }
  }

  return (
    <form className={styles.todoform} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          placeholder="Insert new Todo..."
        />
        <button className={styles.button}>Add</button>
      </div>
    </form>
  );
}
