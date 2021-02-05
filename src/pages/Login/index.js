import React, { useState } from "react";
import logo from "../../assets/logo/logo-totvs-rs.png";
import "./style.scss";
//hook
import { useForm } from "../../hooks/useForm";
//router
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const [users, setUsers] = useState(() => {
    const usersInLocalStorage = localStorage.getItem("users");
    if (usersInLocalStorage) {
      return JSON.parse(usersInLocalStorage);
    } else {
      return [];
    }
  });

  const [form, onChangeInput] = useForm({
    email: "",
    password: "",
  });

  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    const email = form.email;
    const password = form.password;

    const isRegistered = users?.filter(
      (user) => user.email === email && user.password === password
    );

    console.log("isRegistered", isRegistered);

    if (isRegistered.length > 0) {
      history.push("/home");
    } else {
      alert("User not registered, please signup.");
    }
  }

  return (
    <div className="c_login">
      <img src={logo} alt="totvsrs" />
      <h1> Login </h1>
      <form onSubmit={handleLogin}>
        <label> email </label>
        <input
          value={form.email}
          onChange={onChangeInput}
          name={"email"}
          placeholder="email"
          type="email"
          required
        />

        <label> password </label>
        <input
          value={form.password}
          onChange={onChangeInput}
          name={"password"}
          placeholder="password"
          type="password"
          required
        />

        <button type="submit"> login </button>
        <h3>
          or sigup
          <NavLink to="/signup">
            <span> here</span>
          </NavLink>
        </h3>
      </form>
    </div>
  );
};

export default Login;
