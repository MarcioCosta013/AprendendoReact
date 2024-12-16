import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  useEffect(()=> {
    //Chama a API
    const fetchTasks = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10",
        {method: "GET"}
      );

      //pegando os dados retornados
      const data = await response.json(); //convertendo para JSON
      //armazenando no stege
      setTasks(data);
    }
    //Se quiser pode chama uma api para pegar as tarefas
    //fetchTasks();
  }, []); //Quando se passa uma lista vazia esse Effect só vai ser acessado a primeira vez que o usuario acessar.

  function onTaskClick(taskId){
    const newTasks = tasks.map(tasks => {
      //precisa atualizar a tarefa
      if (tasks.id == taskId){
        return { ...tasks, isCompleted: !tasks.isCompleted}
      }

      return tasks;
    });
    setTasks(newTasks)
  }
  
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((tasks) => tasks.id !== taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit(title, description){
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="h-screen w-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>
          Gerenciador de Tarefas
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  );
}

export default App;