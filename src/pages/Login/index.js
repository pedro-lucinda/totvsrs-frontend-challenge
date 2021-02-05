import React from "react";
import logo from "../../assets/logo/logo-totvs-rs.png";
import "./style.scss";
//hook
import { useForm } from "../../hooks/useForm";
//router
import { NavLink } from "react-router-dom";

const Login = () => {
  const [form, onChangeInput] = useForm({
    email: "",
    password: "",
  });

  function handleLogin(e) {
    e.preventDefault();
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
        />

        <label> password </label>
        <input
          value={form.password}
          onChange={onChangeInput}
          name={"password"}
          placeholder="password"
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
