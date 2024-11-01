import { useState, useEffect } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import PageBox from "./PageBox";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Aktuelle Seite
  const [totalPages, setTotalPages] = useState(1); // Gesamtseiten
  const [changes, setChanges] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/todos?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Todos");
        }
        const data = await response.json();
        setTodos(data.todos);
        setChanges(changes + 1);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Fehler beim Abrufen der Todos:", error);
      }
    };

    fetchTodos();
  }, [currentPage]);

  return (
    <div>
      <Form
        changes={changes}
        setChanges={setChanges}
        todos={todos}
        setTodos={setTodos}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
      {/* TodoList wird nur angezeigt, wenn todos vorhanden sind */}
      {todos.length > 0 && (
        <TodoList
          changes={changes}
          setChanges={setChanges}
          todos={todos}
          setTodos={setTodos}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      )}
      {totalPages > 1 && (
        <PageBox
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
