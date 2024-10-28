import { useState } from "react";
import styles from "./form.module.css";

export default function Form({ todos, setTodos }) {
  const [todo, setTodo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim()) {
      try {
        // Neues Todo erstellen
        const newTodo = {
          text: todo,
        };

        // POST-Anfrage an das Backend senden
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

        // Die Antwort des Servers erhalten und das Todo zur Liste hinzufügen
        const addedTodo = await response.json();
        setTodos([...todos, addedTodo]);
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
