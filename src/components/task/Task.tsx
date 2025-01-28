import { TaskDTO } from "../../models/dto";
import check from "../../assets/check.png";
import "./Task.css";
import { useAppDispatch } from "../../models/hooks";
import { changeComplete } from "../../redux/MainSlice";

type Props = {
  data: TaskDTO;
};

export default function Task({ data }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="task" data-testid="task">
      <div
        data-testid="task_checkbox"
        onClick={changeStatus}
        className="task_checkbox"
      >
        <div className="task_checkbox_border"></div>
        {data.isCompleted ? (
          <img
            data-testid="completed"
            className="task_checkbox_check"
            src={check}
            alt=""
          />
        ) : null}
      </div>
      <p>{data.text}</p>
    </div>
  );

  function changeStatus() {
    dispatch(changeComplete(data));
  }
}
