import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./NewTask.scss";

const NewTask = ({ sortAndAddEditor }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.task);

  const { name, text } = task;

  const addTask = async () => {
    if (name.trim()) {
      await axios
        .post("http://localhost:9000/createTask", {
          name: name.trim(),
          text: !text.trim() ? "Описание отсутствует" : text,
          isCheck: false,
        })
        .then((res) => {
          dispatch({
            type: "TASK",
            playload: {
              name: "",
              text: "",
            },
          });
          dispatch({
            type: "ADD_CASH",
            playload: sortAndAddEditor(res.data.data),
          });
        });
    } else {
      alert('Поле "Задача" пустое!!!');
    }
  };

  const delAllTasks = async () => {
    await axios.delete("http://localhost:9000/delAllTasks").then((res) => {
      dispatch({ type: "ADD_CASH", playload: sortAndAddEditor(res.data.data) });
    });
  };

  return (
    <div className="main">
      <h1>To-Do List</h1>
      <div className="newAdd">
        <div className="new-task">
          <p>Задача:</p>
          <TextareaAutosize
            maxRows={3}
            value={name}
            id="add-name"
            className="text-array"
            onChange={(event) =>
              dispatch({
                type: "TASK",
                playload: { name: event.target.value, text },
              })
            }
          />
          <p>Описание:</p>
          <TextareaAutosize
            maxRows={3}
            value={text}
            id="add-task"
            className="text-array"
            onChange={(event) =>
              dispatch({
                type: "TASK",
                playload: { name, text: event.target.value },
              })
            }
          />
        </div>
        <button onClick={() => addTask()}>Add</button>
        <button onClick={() => delAllTasks()}>Delet All Tasks</button>
      </div>
    </div>
  );
};

export default NewTask;
