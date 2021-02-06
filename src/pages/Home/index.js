import React, { useState } from "react";
import CreateToDoForm from "../../components/CreateToDoForm";
import Navbar from "../../components/Navbar";
import { useForm } from "../../hooks/useForm";

const Home = () => {
  const [select, setSelect] = useState("backlog");
  const [form, onChangeInput] = useForm({
    title: "",
    description: "",
  });

  function handleCreateToDo(e) {
    e.preventDefault();
    
  }

  return (
    <div >
      <Navbar />
      <CreateToDoForm
        onSubmit={handleCreateToDo}
        title={form.title}
        description={form.description}
        onChange={onChangeInput}
        select={select}
        onChangeSelect={(e) => setSelect(e.target.value)}
      />
    </div>
  );
};

export default Home;
