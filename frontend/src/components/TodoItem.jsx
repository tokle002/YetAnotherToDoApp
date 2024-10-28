import styles from "./todoitem.module.css";

export default function TodoItem({ item, todos, setTodos, id }) {
  const handleDelete = async () => {
    try {
      // DELETE-Anfrage an das Backend senden
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Todos");
      }

      // Todos filtern, um das gelöschte Todo zu entfernen
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Fehler beim Löschen des Todos:", error);
    }
  };
  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        {item}
        <span>
          <button
            onClick={() => handleDelete(item)}
            className={styles.deleteButton}
          >
            X
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
