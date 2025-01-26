import { useState } from "react";
import "./App.css";
import { TaskDTO } from "./models/dto";
import Task from "./components/task/Taask";

const testData: TaskDTO[] = [
  { id: 1, text: "Hello", isCompleted: true },
  { id: 2, text: "World", isCompleted: false },
  { id: 3, text: "Bye", isCompleted: false },
];

function App() {
  const [tasks, setTask] = useState([]);

  return (
    <div className="todo">
      <h1>todos</h1>
      <input type="text" placeholder=" v Whats needs to be dane ?" />
      {testData.map((task) => (
        <Task data={task} />
      ))}
      <div className="todo_controls">
        <p>n items left</p>
        <div>
          <button>all</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <button>clear tasks</button>
      </div>
    </div>
  );
}

export default App;
