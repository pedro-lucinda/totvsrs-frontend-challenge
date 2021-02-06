import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

const Modal = (props) => {
  const { userId } = useParams();
  const [modalInfo, setModalInfo] = useState(props.modalInfo);
  const [todos, setTodos] = useState(props.todos);
  console.log(todos);

  const [form, onChangeInput] = useForm({
    title: modalInfo.title,
    todo: modalInfo.toDo,
    select: modalInfo.status,
  });

  //change to do or do nothing
  function handleChangeTodo(e) {
    e.preventDefault();

    const editedTodo = {
      title: form.title,
      todo: form.todo,
      select: form.select,
    };


  }

  return (
    <div>
      <form onSubmit={handleChangeTodo}>
        <section>
          <input
            value={form.title}
            onChange={onChangeInput}
            name={"title"}
            type="text"
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
        <input
          value={form.todo}
          onChange={onChangeInput}
          name="todo"
          type="text"
        />
        <section>
          <button type="submit">Save</button>
          <button onClick={props.delete}>Delete</button>
          <button onClick={props.cancel}> Cancel </button>
        </section>
      </form>
    </div>
  );
};

export default Modal;
