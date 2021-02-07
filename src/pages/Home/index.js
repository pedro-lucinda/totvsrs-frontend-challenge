import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateToDoForm from "../../components/CreateToDoForm";
import Navbar from "../../components/Navbar";
import { useForm } from "../../hooks/useForm";
import { v4 as uuid_v4 } from "uuid";
import ToDo from "../../components/ToDo";
import "./style.scss";
import Modal from "../../components/Modal";

const Home = () => {
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);
  const [localStorageTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))
  );
  const [select, setSelect] = useState("backlog");
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [todoModalInfo, setTodoModalInfo] = useState([]);

  //forms
  const [form, onChangeInput] = useForm({
    title: "",
    description: "",
  });

  // get users to dos
  useEffect(() => {
    if (localStorageTodos) {
      const userTodos = localStorageTodos.filter(
        (todo) => todo.userid === userId
      );
      return setTodos(userTodos);
    }
  }, [userId, localStorageTodos]);

  //create to do
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

    localStorage.setItem(
      "todos",
      JSON.stringify([...localStorageTodos, newTodo])
    );
    setTodos([...todos, newTodo]);
    return alert("To Do Created!");
  }

  //open modal
  function handleOpenModal(id) {
    const modalInfo = todos.filter((todo) => todo.id === id);
    setTodoModalInfo(modalInfo[0]);
    return setOpenModal(true);
  }

  //delete to do and close modal
  function handleDeleteTodo(id) {
    const newTodoList = todos.filter((todo) => todo.id !== id);
    const newStorageTodoList = localStorageTodos.filter(
      (todo) => todo.id !== id
    );
    setTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newStorageTodoList));
    alert("Deleted");
    return setOpenModal(false);
  }
  console.log("todos", todos);
  console.log("localStorageTodos", localStorageTodos);
  
  return (
    <div
      className="c_home"
      style={{
        backgroundColor: `${openModal ? "rgba(0, 0, 0, 0.4)" : "#F4F4F4"}`,
      }}
    >
      <Navbar />
      <CreateToDoForm
        onSubmit={handleCreateToDo}
        title={form.title}
        description={form.description}
        onChange={onChangeInput}
        select={select}
        onChangeSelect={(e) => setSelect(e.target.value)}
      />
      {openModal && (
        <Modal
          todos={localStorageTodos}
          modalInfo={todoModalInfo}
          delete={() => handleDeleteTodo(todoModalInfo.id)}
          cancel={() => setOpenModal(false)}
        />
      )}

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
            onClick={() => handleOpenModal(todo.id)}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
