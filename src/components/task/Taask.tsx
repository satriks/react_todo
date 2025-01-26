import React from "react";
import { TaskDTO } from "../../models/dto";
import "./Task.css";

type Props = { data: TaskDTO };

export default function Task({ data }: Props) {
  return (
    <div className="task" key={data.id}>
      <input type="radio"></input>
      <p>{data.text}</p>
    </div>
  );
}
