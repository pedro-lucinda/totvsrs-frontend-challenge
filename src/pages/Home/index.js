import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateToDoForm from "../../components/CreateToDoForm";
import Navbar from "../../components/Navbar";
import { useForm } from "../../hooks/useForm";
import { v4 as uuid_v4 } from "uuid";
import ToDo from "../../components/ToDo";
import "./style.scss";

const Home = () => {
  const [select, setSelect] = useState("backlog");
  const { userId } = useParams();
  const [form, onChangeInput] = useForm({
    title: "",
    description: "",
  });

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosInLocalStorage = JSON.parse(localStorage.getItem("todos"));

    if (todosInLocalStorage) {
      const userTodos = todosInLocalStorage.filter(
        (todo) => todo.userid === userId
      );
      return setTodos(userTodos);
    } else {
      return setTodos([]);
    }
  }, [userId]);

  function handleCreateToDo(e) {
    e.preventDefault();

    const newTodo = {
      userid: userId,
      id: uuid_v4(),
      title: form.title,
      toDo: form.description,
      status: select,
    };

    form.title = "";
    form.description = "";

    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
    return alert("To Do Created!");
  }

  return (
    <div className="c_home">
      <Navbar />
      <CreateToDoForm
        onSubmit={handleCreateToDo}
        title={form.title}
        description={form.description}
        onChange={onChangeInput}
        select={select}
        onChangeSelect={(e) => setSelect(e.target.value)}
      />

      <main className="c_todosHome">
        <h2> To Do List </h2>
        {todos?.map((todo) => (
          <ToDo
            key={uuid_v4()}
            title={todo.title}
            todo={todo.toDo}
            status={todo.status}
            bgColor={
              (todo.status === "done" && "#9DF247") ||
              (todo.status === "doing" && "#F2A447") ||
              (todo.status === "backlog" && "#979797")
            }
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
