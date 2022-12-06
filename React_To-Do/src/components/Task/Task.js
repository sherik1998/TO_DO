import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import "./Task.scss";

const getStringTime = (time) => {
  if (time) {
    const milliseconds = time % 1000;
    const seconds = ((time / 1000) | 0) % 60;
    const minutes = ((time / 60000) | 0) % 60;
    const hours = (time / 3600000) | 0;

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}:${
      milliseconds < 10 ? "0" + milliseconds : milliseconds
    }`;
  }

  return "00:00:00:00";
};

const Task = ({
  index,
  item,
  allTasks,
  changeBD,
  openEditor,
  delTask,
  setUser,
  endTask,
  startTask,
}) => {
  let history = useHistory();

  const [nameUser, setName] = useState(item.user ? item.user.id : "null");

  const handleChange = (event) => {
    if (event.target.value) {
      setName(event.target.value);
      setUser(item.id, event.target.value);
    }
  };

  const users = useSelector((state) => state.users);

  const { id, name, text, isCheck } = item;

  const paramCheck = {
    type: "checkbox",
    className: "check",
    checked: isCheck,
    onChange: () => onChangeCheckbox(index),
  };

  const onChangeCheckbox = (index) => {
    allTasks[index].isCheck = !allTasks[index].isCheck;
    changeBD(index);
  };

  const editRedirect = (id) => {
    history.push(`/edit/${id}`);
  };

  const usersProtect = users ? users : [];

  return (
    <>
      {isCheck ? (
        <div className="page done">
          <div className="header-title">
            <h2 className="done-task">{name}</h2>
            <Select
              native
              value={item.user.id}
              inputProps={{
                name: "None",
                id: "age-native-simple",
              }}
            >
              <option value={item.user.id}>{item.user.name}</option>
            </Select>
          </div>

          <p className="text-task done-task">{text}</p>
          <div className="time-tracker-done">
            <p>{getStringTime(item.timePoints)}</p>
          </div>
          <div className="edit">
            <img
              src={edit}
              onClick={() => openEditor(index)}
              className="delImg"
              alt="delete"
            />
            <input {...paramCheck} />
            <img src={del} onClick={() => delTask(index)} alt="delete" />
          </div>
        </div>
      ) : (
        <div className="page" onDoubleClick={() => editRedirect(id)}>
          <div className="header-title">
            <h2>{name}</h2>
            <Select
              native
              value={nameUser}
              onChange={handleChange}
              inputProps={{
                name: "None",
                id: "age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {usersProtect.map((user) => {
                return (
                  <option key={`user-${user.id}`} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </Select>
          </div>
          <p className="text-task">{text}</p>
          <div className="time-tracker">
            <button
              id={`start-${item.id}`}
              onClick={async () => await startTask(item.id)}
            >
              Start
            </button>
            <p>{getStringTime(item.timePoints)}</p>
            <button id={`stop-${item.id}`} onClick={() => endTask(item.id)}>
              Stop
            </button>
          </div>
          <div className="edit">
            <img src={edit} onClick={() => openEditor(index)} alt="" />
            <input {...paramCheck} />
            <img src={del} onClick={() => delTask(index)} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
