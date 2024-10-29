import styles from "./todoitem.module.css";

export default function TodoItem({
  changes,
  setChanges,
  item,
  todos,
  setTodos,
  id,
  setCurrentPage,
}) {
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

      // Überprüfen, ob die Liste leer ist und gegebenenfalls die aktuelle Seite aktualisieren
      if (updatedTodos.length === 0) {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
      } else if (updatedTodos.length < (setCurrentPage - 1) * 5) {
        // Wenn die aktuelle Seite mehr Todos hat als jetzt verfügbar, gehe zur letzten Seite
        setCurrentPage(Math.ceil(updatedTodos.length / 5));
      }
      setChanges(changes + 1);
    } catch (error) {
      console.error("Fehler beim Löschen des Todos:", error);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        {item}
        <span>
          <button onClick={handleDelete} className={styles.deleteButton}>
            X
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
