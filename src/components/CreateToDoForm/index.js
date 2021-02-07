import React from "react";
import "./style.scss";

const CreateToDoForm = (props) => {
  return (
    <div className="c_createToDo  animateUp">
      <h2> Create a To Do </h2>
      <form onSubmit={props.onSubmit}>
        <input
          placeholder="Title"
          name={"title"}
          value={props.title}
          onChange={props.onChange}
          type="text"
          maxLength="35"
          required
        />
        <textarea
          placeholder="Description"
          name={"description"}
          value={props.description}
          onChange={props.onChange}
          type="text"
          maxLength="70"
          required
        />

        <div>
          <select value={props.select} onChange={props.onChangeSelect} required>
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

          <button type="submit"> create </button>
        </div>
      </form>
    </div>
  );
};

export default CreateToDoForm;
