import React from "react";
import "./scss/global.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { TodosContextProvider } from "./context/todosContext";
import { LSTodosContextProvider } from "./context/localStorageTodos";

function App() {
  return (
    <>
      <BrowserRouter>
        <LSTodosContextProvider>
          <TodosContextProvider>
            <Routes />
          </TodosContextProvider>
        </LSTodosContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
