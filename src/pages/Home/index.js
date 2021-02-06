import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CreateToDoForm from "../../components/CreateToDoForm";
import Navbar from "../../components/Navbar";
import { useForm } from "../../hooks/useForm";
import { v4 as uuid_v4 } from "uuid";
import ToDo from "../../components/ToDo";

const Home = () => {
  const [select, setSelect] = useState("backlog");
  const { userId } = useParams();
  const [form, onChangeInput] = useForm({
    title: "",
    description: "",
  });

  const [todos, setTodos] = useState(() => {
    const todosInLocalStorage = localStorage.getItem("todos");
    if (todosInLocalStorage) {
      return JSON.parse(todosInLocalStorage);
    } else {
      return [];
    }
  });

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
    <div>
      <Navbar />
      <CreateToDoForm
        onSubmit={handleCreateToDo}
        title={form.title}
        description={form.description}
        onChange={onChangeInput}
        select={select}
        onChangeSelect={(e) => setSelect(e.target.value)}
      />

      <main>
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
