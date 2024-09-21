import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchTodos } from "../api/todosApi";
import TodoList from "../components/TodoList";
import './SearchTodos.css'; 

const SearchTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    searchQuery: ""
  };

  const validationSchema = Yup.object({
    searchQuery: Yup.string().required("Search query is required")
  });

  const handleSearch = async (values, { setSubmitting }) => {
    setIsFetching(true);
    setErrorMessage("");
    
    try {
      const result = await fetchTodos(values.searchQuery);
      setTodos(result);
    } catch (error) {
      setErrorMessage("Error fetching data.");
    } finally {
      setIsFetching(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="search-container">
      <h1 className="title">Search Todos</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSearch}
      >
        {({ isSubmitting }) => (
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
        )}
      </Formik>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <TodoList todos={todos} />
    </div>
  );
};

export default SearchTodos;
