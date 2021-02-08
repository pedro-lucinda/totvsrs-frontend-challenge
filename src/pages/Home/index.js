/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
//components + styles
import CreateToDoForm from "../../components/CreateToDoForm";
import Navbar from "../../components/Navbar";
import ToDo from "../../components/ToDo";
import Modal from "../../components/Modal";
import Swal from "sweetalert2";
import "./style.scss";
//route
import { useHistory, useParams } from "react-router-dom";
//hooks
import { useForm } from "../../hooks/useForm";
//id
import { v4 as uuid_v4 } from "uuid";
//context
import { TodosContext } from "../../context/todosContext";
import { LSTodosContext } from "../../context/localStorageTodos";

const Home = () => {
  const { userId } = useParams();
  const history = useHistory();
  const { todos, setTodos } = useContext(TodosContext);
  const { localStorageTodos } = useContext(LSTodosContext);
  const [select, setSelect] = useState("backlog");
  //modal
  const [openModal, setOpenModal] = useState(false);
  const [todoModalInfo, setTodoModalInfo] = useState([]);

  //forms
  const [form, onChangeInput] = useForm({
    title: "",
    description: "",
  });

  //verification if the user is logged in
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("session"));
    if (!userSession) {
      Swal.fire({
        icon: "error",
        title: "You need to login first",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "p_swal",
          title: "h_swal",
          header: "h_swal",
          content: "h_swal",
        },
      });
      return history.push("/");
    }
  }, [userId]);

  //get all to dos
  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    if (localStorageTodos) {
      const userTodos = localStorageTodos.filter(
        (todo) => todo.userid === userId
      );
      return setTodos(userTodos);
    }
  }, [userId]);

  //create to do
  function handleCreateToDo(e) {
    e.preventDefault();

    const newTodo = {
      userid: userId,
      id: uuid_v4(),
      title: form.title,
      toDo: form.description,
      status: select,
      date: Date.now(),
    };

    localStorage.setItem(
      "todos",
      JSON.stringify([...localStorageTodos, newTodo])
    );
    setTodos([...todos, newTodo]);

    form.title = "";
    form.description = "";

    return Swal.fire({
      icon: "success",
      title: "To do Created",
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

  //delete to do and close modal
  function handleDeleteTodo(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        popup: "p_swal-deletePopUp",
        title: "h_swal",
        header: "h_swal",
        closeButton: "b_swal",
        content: "h_swal",
        validationMessage: "h_swal",
        confirmButton: "b_swal",
        denyButton: "b_swal-cancel",
        cancelButton: "b_swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodoList = todos.filter((todo) => todo.id !== id);
        const newStorageTodoList = localStorageTodos.filter(
          (todo) => todo.id !== id
        );
        setTodos(newTodoList);
        localStorage.setItem("todos", JSON.stringify(newStorageTodoList));

        return setOpenModal(false);
      }
    });
  }

  //open modal
  function handleOpenModal(id) {
    const modalInfo = todos.filter((todo) => todo.id === id);
    setTodoModalInfo(modalInfo[0]);
    return setOpenModal(true);
  }

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
          modalInfo={todoModalInfo}
          setOpenModal={setOpenModal}
          delete={() => handleDeleteTodo(todoModalInfo.id)}
          cancel={() => setOpenModal(false)}
        />
      )}

      <main className="c_todosHome  animateUp">
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
        {todos.length < 1 && <p> Your to do list will appear here! </p>}
      </main>
    </div>
  );
};

export default Home;
