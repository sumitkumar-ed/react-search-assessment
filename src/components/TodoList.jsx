import React from "react";
import './TodoList.css';

const TodoList = ({ todos }) => {
  if (todos.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <div className="todo-list-container">
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span className="todo-number">{index + 1}. </span>
            <p>{todo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
