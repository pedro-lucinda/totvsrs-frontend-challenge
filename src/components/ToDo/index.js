import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./style.scss";

const ToDo = (props) => {
  return (
    <div className="c_toDo" onClick={props.onClick}>
      <main>
        <section>
          <h3> {props.title} </h3>
          <div style={{ background: props.bgColor }}>
            <h3>{props.status}</h3>
          </div>
        </section>
        <p> {props.todo} </p>
      </main>
      <FaArrowRight onClick={props.onClick} />
    </div>
  );
};

export default ToDo;
