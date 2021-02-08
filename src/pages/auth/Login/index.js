import React, {  useState } from "react";
import logo from "../../../assets/logo/logo-totvs-rs.png";
import "../style.scss";
//hook
import { useForm } from "../../../hooks/useForm";
//router
import { NavLink, useHistory } from "react-router-dom";
//context
//alert
import Swal from "sweetalert2";

const Login = () => {
  const [users] = useState(() => {
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
    if (isRegistered[0]) {
      localStorage.setItem("session", JSON.stringify(true))
      return history.push(`/home/${isRegistered[0].id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Email or password are invalid.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "p_swal",
          title: "h_swal",
          header: "h_swal",
          content: "h_swal",
        },
      });
    }
  }

  return (
    <div className="c_loginSignup animateUp">
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
          or sigup{" "}
          <NavLink to="/signup">
            <span>here</span>
          </NavLink>
        </h3>
      </form>
    </div>
  );
};

export default Login;
