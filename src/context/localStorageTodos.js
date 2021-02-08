import React, { createContext, useEffect, useState } from "react";

export const LSTodosContext = createContext();

export const LSTodosContextProvider = (props) => {
  const [localStorageTodos, setLocalStorageTodos] = useState([]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos.length > 0) {
      return setLocalStorageTodos(todos);
    }
  }, []);

  return (
    <LSTodosContext.Provider value={{ localStorageTodos }}>
      {props.children}
    </LSTodosContext.Provider>
  );
};
