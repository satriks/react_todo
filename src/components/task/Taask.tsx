import React from "react";
import { TaskDTO } from "../../models/dto";
import check from "../../assets/check.png";
import "./Task.css";

type Props = { data: TaskDTO };

export default function Task({ data }: Props) {
  return (
    <div className="task" key={data.id}>
      <div className="task_checkbox">
        <div className="task_checkbox_border"></div>
        <img className="task_checkbox_check" src={check} alt="" />
      </div>
      <p>{data.text}</p>
    </div>
  );
}
