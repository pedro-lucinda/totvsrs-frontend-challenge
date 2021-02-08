import React, { useState } from "react";
import logo from "../../../assets/logo/logo-totvs-rs.png";
import "../style.scss";
//hook
import { useForm } from "../../../hooks/useForm";
//router
import { NavLink, useHistory } from "react-router-dom";
//uuid
import { v4 as uuid_v4 } from "uuid";
//context
//alert
import Swal from "sweetalert2";

const Signup = () => {
  const history = useHistory();
  const [users] = useState(() => {
    const usersInLocalStorage = localStorage.getItem("users");
    if (usersInLocalStorage) {
      return JSON.parse(usersInLocalStorage);
    } else {
      return [];
    }
  });

  const [form, onChangeInput] = useForm({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  function handleSignup(e) {
    e.preventDefault();

    const newUser = {
      id: uuid_v4(),
      name: form.name,
      email: form.email,
      password: form.password,
      auth: true,
    };

    const newUserEmail = form.email;
    const notAvalible = users?.filter((user) => user.email === newUserEmail);

    if (notAvalible.length > 0) {
      return Swal.fire({
        icon: "error",
        title: "This email is taken.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "p_swal",
          title: "h_swal",
          header: "h_swal",
          content: "h_swal",
        },
      });
    } else {
      localStorage.setItem("session", JSON.stringify(true));
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      return history.push(`/home/${newUser.id}`);
    }
  }

  return (
    <div className="c_loginSignup animateUp">
      <img src={logo} alt="totvsrs" />
      <h1> Signup </h1>
      <form onSubmit={handleSignup}>
        <label> name </label>
        <input
          value={form.name}
          onChange={onChangeInput}
          name={"name"}
          placeholder="name"
          type="text"
          pattern={".{3,}"}
          required
        />

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
          pattern={".{6,}"}
          required
        />

        <button type="submit"> Signup </button>
        <h3>
          or login{" "}
          <NavLink to="/">
            <span>here</span>
          </NavLink>
        </h3>
      </form>
    </div>
  );
};

export default Signup;
