import React, { createContext, useState } from "react";

export const UserSessionContext = createContext();

export const UserSessionContextProvider = (props) => {
  const [userSession, setUserSession] = useState(false);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      {props.children}
    </UserSessionContext.Provider>
  );
};
