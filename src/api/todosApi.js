import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async (searchQuery = "") => {
  try {
    const response = await axios.get(API_URL);
    const todos = response.data;

    if (searchQuery) {
      return todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return todos;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
