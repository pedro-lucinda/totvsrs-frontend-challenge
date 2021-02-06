import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/home/:userId" exact component={Home} />
      </Switch>
    </>
  );
};

export default Routes;
