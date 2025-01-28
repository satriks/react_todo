import App from "./App";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "./redux";

describe("something truthy and falsy", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it("create h1 todos", () => {
    const h1: HTMLHeadingElement = screen.getByText("todos");
    expect(h1).toBeTruthy();
  });
  it("create input", () => {
    const inputElement = screen.getByTestId("todo_input");
    expect(inputElement).toBeTruthy();
  });

  it("renders the input placeholder", () => {
    const inputElement = screen.getByPlaceholderText(
      /Whats needs to be done ?/i
    );
    expect(inputElement).toBeTruthy();
  });
  it("create task", async () => {
    const inputElement = screen.getByTestId("todo_input");
    await userEvent.type(inputElement, "test{enter}");

    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(4);
  });
  it("filter all", async () => {
    const filter = screen.getByTestId("filter_all");
    await userEvent.click(filter);
    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(4);
  });

  it("filter active", async () => {
    const filter = screen.getByTestId("filter_active");
    await userEvent.click(filter);
    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(3);
  });

  it("filter completed", async () => {
    const filter = screen.getByTestId("filter_completed");
    await userEvent.click(filter);
    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(1);
  });

  it("clear completed", async () => {
    const buttonClear = screen.getByTestId("todo_clear_button");
    await userEvent.click(buttonClear);
    const tasks = screen.queryAllByTestId("completed");
    expect(tasks.length).toBe(0);
  });

  it("filter all after clear completed and check counter", async () => {
    const filter = screen.getByTestId("filter_all");
    await userEvent.click(filter);
    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(3);
    await userEvent.click(screen.getByTestId("filter_active"));
    const taskCounter = screen.getByText(/items left/i);
    expect(taskCounter.textContent).toBe(" 3 items left ");
  });

  it("filter all after clear completed", async () => {
    const task = screen.getAllByTestId("task_checkbox");
    await userEvent.click(task[0]);
    const filter = screen.getByTestId("filter_completed");
    await userEvent.click(filter);
    const tasks = screen.getAllByTestId("task");
    expect(tasks.length).toBe(1);
  });

  it("filter all after clear completed", async () => {
    await userEvent.click(screen.getByTestId("filter_active"));
    const tasks = screen.getAllByTestId("task_checkbox");
    tasks.forEach(async (task) => userEvent.click(task));
    await userEvent.click(screen.getByTestId("todo_clear_button"));
    const taskCounter = screen.getByText(/items left/i);
    expect(taskCounter.textContent).toBe(" 0 items left ");
  });
});
