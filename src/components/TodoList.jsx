import React from "react";

const TodoList = ({ todos }) => {
  if (todos.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <p><strong>{todo.title}</strong></p>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
