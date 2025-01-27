import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./MainSlice";

const store = configureStore({
  reducer: MainSlice,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
