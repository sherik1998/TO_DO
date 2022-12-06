import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./NewTask.scss";

const PORT = process.env.REACT_APP_PORT;

const NewTask = ({ getAllTasks, getTasks }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const task = useSelector((state) => state.task);

  const { name, text } = task;
  const token = localStorage.getItem("token");

  const addTask = () => {
    if (name.trim()) {
      axios
        .post(
          `${PORT}/task`,
          {
            name: name.trim(),
            text: !text.trim() ? "Описание отсутствует" : text,
          },
          {
            headers: { authorization: token },
          }
        )
        .then(() => {
          dispatch({
            type: "TASK",
            payload: {
              name: "",
              text: "",
            },
          });
          getAllTasks();
        });
    } else {
      alert('Поле "Задача" пустое!!!');
    }
  };

  const delAllTasks = () => {
    axios
      .delete(`${PORT}/task/all`, {
        headers: { authorization: token },
      })
      .then(() => {
        getAllTasks();
      });
  };

  const logout = () => {
    localStorage.clear();
    history.push("");
  };

  return (
    <div className="main">
      <div className="exit-div">
        <button className="exit-button" onClick={() => logout()}>
          Exit
        </button>
      </div>

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
                payload: { name: event.target.value, text },
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
                payload: { name, text: event.target.value },
              })
            }
          />
        </div>
        <button onClick={() => addTask()}>Add</button>
        <button onClick={() => delAllTasks()}>Delete All Tasks</button>
      </div>
      <button onClick={() => getTasks()} className="all-tasks">
        All Tasks
      </button>
      <button onClick={() => getAllTasks()} className="all-tasks">
        My Tasks
      </button>
    </div>
  );
};

export default NewTask;
