import { createSlice } from "@reduxjs/toolkit";
import { TaskDTO } from "../models/dto";

interface InitialStateType {
  tasks: TaskDTO[];
}

const testData: TaskDTO[] = [
  { id: 1, text: "Hello", isCompleted: true },
  { id: 2, text: "World", isCompleted: false },
  { id: 3, text: "Bye", isCompleted: false },
];

const initialState: InitialStateType = {
  tasks: testData,
};

const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    changeComplete(state, action) {
      const newTasks = [...state.tasks];
      const index = newTasks.findIndex((task) => task.id === action.payload.id);
      newTasks[index].isCompleted = !newTasks[index].isCompleted;
      state.tasks = newTasks;
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => task.isCompleted === false);
    },
  },
});

export const { addTask, changeComplete, clearCompleted } = MainSlice.actions;

export default MainSlice.reducer;
