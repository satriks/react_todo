import { useState, useEffect } from "react";
import { addTask, clearCompleted } from "./redux/MainSlice";
import "./App.css";
import Task from "./components/task/Task";
import { useAppDispatch, useAppSelector } from "./models/hooks";
import { TaskDTO } from "./models/dto";

function App() {
  const tasksState = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [tasks, setTask] = useState<TaskDTO[] | null>();
  const [filter, setFilter] = useState<number>(0);
  useEffect(() => setTask(tasksState), [tasksState]);

  return (
    <div className="todo">
      <h1>todos</h1>
      <input
        data-testid="todo_input"
        onKeyUp={inputSubmit}
        type="text"
        placeholder={"v  Whats needs to be done ?"}
      />
      <div data-testid="todo_tasks" className="todo_tasks">
        {filterTasks(tasks ? tasks : [])?.map((task) => (
          <Task key={task.id + task.text} data={task} />
        ))}
      </div>
      <div className="todo_controls">
        {tasks ? <p> {countTasks(tasks) + " items left"} </p> : null}
        <div className="todo_filters">
          <button data-testid="filter_all" onClick={() => setFilter(0)}>
            all
          </button>
          <button data-testid="filter_active" onClick={() => setFilter(1)}>
            Active
          </button>
          <button data-testid="filter_completed" onClick={() => setFilter(2)}>
            Completed
          </button>
        </div>
        <button
          data-testid="todo_clear_button"
          onClick={() => dispatch(clearCompleted())}
          className="todo_clear"
        >
          clear completed
        </button>
      </div>
    </div>
  );

  function inputSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.key === "Enter") {
      if (tasks) {
        dispatch(
          addTask({
            id: tasks.length + 1,
            text: e.currentTarget.value,
            isCompleted: false,
          })
        );
      }
      e.currentTarget.value = "";
    }
  }

  function countTasks(tasks: TaskDTO[] | null) {
    if (!tasks) return 0;
    return tasks.filter((task) => task.isCompleted === false).length;
  }

  function filterTasks(tasks: TaskDTO[] | null) {
    if (!tasks || !filter) return tasks;
    if (filter === 1) {
      return tasks.filter((task) => task.isCompleted === false);
    }
    return tasks.filter((task) => task.isCompleted === true);
  }
}
export default App;
