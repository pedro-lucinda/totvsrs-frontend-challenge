import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo/logo-totvs-rs.png";
import "./style.scss";

const Navbar = () => {
  const history = useHistory();

  function handleSignOut() {
    localStorage.setItem("session", JSON.stringify(false));
    return history.push("/");
  }

  return (
    <div className="c_navbar">
      <main>
        <img src={logo} alt="Totvsrs" />
        <h3 onClick={handleSignOut}> signout</h3>
      </main>
    </div>
  );
};

export default Navbar;
