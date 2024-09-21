import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchTodos } from "../api/todosApi";
import TodoList from "../components/TodoList";
import './SearchTodos.css';

const SearchTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    searchQuery: ""
  };

  const validationSchema = Yup.object({
    searchQuery: Yup.string().required("Search query is required")
  });

  // Fetch all todos initially when the component mounts
  useEffect(() => {
    const fetchAllTodos = async () => {
      setIsFetching(true);
      try {
        const result = await fetchTodos();
        setTodos(result);
        setFilteredTodos(result); // Initially display all todos
      } catch (error) {
        setErrorMessage("Error fetching initial data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchAllTodos();
  }, []);

  return (
    <div className="search-container">
      <h1 className="title">Search Todos</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true} // Validate on change for real-time feedback
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          const searchQuery = values.searchQuery.trim().toLowerCase();

          // Check if the searchQuery is empty
          if (searchQuery === "") {
            setFilteredTodos(todos); // Show all todos if the search box is cleared
            setErrorMessage(""); // Clear error message
          } else {
            const filtered = todos.filter(todo =>
              todo.title.toLowerCase().includes(searchQuery)
            );

            if (filtered.length === 0) {
              setErrorMessage("No results found.");
            } else {
              setErrorMessage(""); // Clear error message if results are found
            }

            setFilteredTodos(filtered);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => {
          // Reset filteredTodos when searchQuery is cleared
          if (values.searchQuery === "") {
            setFilteredTodos(todos);
            setErrorMessage(""); // Clear error message when the search box is cleared
          }

          return (
            <Form className="search-form">
              <div className="search-input-wrapper">
                <Field
                  type="text"
                  name="searchQuery"
                  placeholder="Search Todos"
                  className="search-input"
                />
                <ErrorMessage
                  name="searchQuery"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="search-button"
                disabled={isSubmitting || isFetching}
              >
                {isFetching ? "Searching..." : "Search"}
              </button>
            </Form>
          );
        }}
      </Formik>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default SearchTodos;
