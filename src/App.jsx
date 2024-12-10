import { useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTasks";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar Programação",
      description: "Estudar programação para se tornar um desenvolverdor",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar MATEMÁTICA",
      description: "Estudar matemática para se tornar um desenvolverdor",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar inglês",
      description: "Estudar inglês para se tornar um desenvolverdor",
      isCompleted: false,
    },
  ]);

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
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  );
}

export default App;
