import React, { createContext, useEffect, useState } from "react";

export const UserSessionContext = createContext();

export const UserSessionContextProvider = (props) => {
  const [userSession, setUserSession] = useState(false);

  useEffect(() => {
    return localStorage.setItem("session", JSON.stringify(userSession));
  }, [userSession]);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      {props.children}
    </UserSessionContext.Provider>
  );
};
