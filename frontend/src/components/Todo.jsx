import { useState } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import PageBox from "./PageBox";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  return (
    <div>
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <PageBox />
    </div>
  );
}
