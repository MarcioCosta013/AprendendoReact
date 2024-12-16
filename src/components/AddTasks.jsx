import { useState } from "react";
import Input from "./Input";
import Button from "./Button";


function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col ">
      <Input
        type="text"
        placeholder="Digite o titulo da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Input
        type="text"
        placeholder="Digite o titulo a descrição da tarefa"
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <Button
        onClick={() => {
            if(!title.trim() || !description.trim()){
                return alert("Preencha todos os campos")
            }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        
      >
        Adicionar
      </Button>
    </div>
  );
}

export default AddTask;
