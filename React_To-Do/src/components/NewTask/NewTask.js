import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./NewTask.scss";

const PORT = process.env.REACT_APP_PORT;

const NewTask = ({ getAllTasks }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const task = useSelector((state) => state.task);

  const { name, text } = task;
  const token = localStorage.getItem("token");

  const addTask = async () => {
    if (name.trim()) {
      await axios
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
        .then(async () => {
          dispatch({
            type: "TASK",
            playload: {
              name: "",
              text: "",
            },
          });
          await getAllTasks();
        });
    } else {
      alert('Поле "Задача" пустое!!!');
    }
  };

  const delAllTasks = async () => {
    await axios
      .delete(`${PORT}/task/all`, {
        headers: { authorization: token },
      })
      .then(async () => {
        await getAllTasks();
      });
  };

  const logout = async () => {
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
        <button onClick={() => delAllTasks()}>Delete All Tasks</button>
      </div>
    </div>
  );
};

export default NewTask;
