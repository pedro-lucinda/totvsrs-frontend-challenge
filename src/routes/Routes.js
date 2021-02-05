import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </>
  );
};

export default Routes;
