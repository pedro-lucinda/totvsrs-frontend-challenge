import React, { useContext, useState } from "react";
import { LSTodosContext } from "../../context/localStorageTodos";
import { TodosContext } from "../../context/todosContext";
import { useForm } from "../../hooks/useForm";
import "./style.scss";

const Modal = (props) => {
  const [modalInfo] = useState(props.modalInfo);
  const { localStorageTodos } = useContext(LSTodosContext);
  const { todos, setTodos } = useContext(TodosContext);
  const [select, setSelect] = useState(modalInfo.status || "backlog");
  const [form, onChangeInput] = useForm({
    title: modalInfo.title,
    todo: modalInfo.toDo,
    status: modalInfo.status,
  });

  //change to do or do nothing
  function handleChangeTodo() {
    const editedTodo = {
      id: modalInfo.id,
      userid: modalInfo.userid,
      title: form.title || modalInfo.title,
      toDo: form.todo || modalInfo.toDo,
      status: select || modalInfo.status,
    };

    const withoutOldTodoInLS = localStorageTodos.filter(
      (todo) => todo.id !== modalInfo.id
    );

    const withoutOldTodo = todos.filter((todo) => todo.id !== modalInfo.id);

    localStorage.setItem(
      "todos",
      JSON.stringify([...withoutOldTodoInLS, editedTodo])
    );

    setTodos([...withoutOldTodo, editedTodo]);
    return props.setOpenModal(false);
  }

  return (
    <div className="c_modal">
      <h2> Edit </h2>
      <main>
        <section>
          <input
            value={form.title}
            onChange={onChangeInput}
            name={"title"}
            type="text"
            maxLength="35"
          />
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="backlog" name="backlog">
              backlog
            </option>
            <option value="doing" name="doing">
              doing
            </option>
            <option value="done" name="done">
              done
            </option>
          </select>
        </section>
        <textarea
          value={form.todo}
          onChange={onChangeInput}
          name="todo"
          type="text"
          maxLength="70"
        />
        <section className="s_buttons">
          <button onClick={handleChangeTodo}>Save</button>
          <button onClick={props.delete} style={{ backgroundColor: "red" }}>
            Delete
          </button>
          <button onClick={props.cancel} style={{ backgroundColor: "#F2A447" }}>
            Cancel
          </button>
        </section>
      </main>
    </div>
  );
};

export default Modal;
