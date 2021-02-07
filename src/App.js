import React from "react";
import "./scss/global.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { TodosContextProvider } from "./context/todosContext";
import { LSTodosContextProvider } from "./context/localStorageTodos";
import { UserSessionContextProvider } from "./context/userSessionContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserSessionContextProvider>
          <LSTodosContextProvider>
            <TodosContextProvider>
              <Routes />
            </TodosContextProvider>
          </LSTodosContextProvider>
        </UserSessionContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
