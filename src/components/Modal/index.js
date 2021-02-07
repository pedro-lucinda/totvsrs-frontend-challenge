import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./style.scss";

const Modal = (props) => {
  const [modalInfo] = useState(props.modalInfo);
  const [todos] = useState(props.todos);

  const [form, onChangeInput] = useForm({
    title: modalInfo.title,
    todo: modalInfo.toDo,
    select: modalInfo.status,
  });

  //change to do or do nothing
  function handleChangeTodo() {
    const editedTodo = {
      id: modalInfo.id,
      userid: modalInfo.userid,
      title: form.title,
      todo: form.todo,
      select: form.select,
    };

    const withoutOldTodo = todos.filter((todo) => todo.id !== modalInfo.id);

    localStorage.setItem(
      "todos",
      JSON.stringify([...withoutOldTodo, editedTodo])
    );

    return console.log("edited");
  }

  return (
    <div className="c_modal">
      <h2> Edit to do </h2>
      <main>
        <section>
          <input
            value={form.title}
            onChange={onChangeInput}
            name={"title"}
            type="text"
            maxLength="35"
          />
          <select value={form.select} onChange={onChangeInput}>
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
