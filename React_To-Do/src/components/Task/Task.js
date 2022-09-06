import React from "react";
import { useHistory } from "react-router-dom";
import edit from "../../img/edit.png";
import delet from "../../img/delet.png";
import "./Task.scss";

const Task = ({ index, item, allTasks, changeBD, openEditor, delTask }) => {
  let history = useHistory();

  const { _id, name, text, isCheck } = item;

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

  return (
    <>
      {isCheck ? (
        <div className="page done">
          <h2 className="done-task">{name}</h2>
          <p className="text-task done-task">{text}</p>
          <div className="edit">
            <img
              src={edit}
              onClick={() => openEditor(index)}
              className="delImg"
              alt="delete"
            />
            <input {...paramCheck} />
            <img src={delet} onClick={() => delTask(index)} alt="delete" />
          </div>
        </div>
      ) : (
        <div className="page" onDoubleClick={() => editRedirect(_id)}>
          <h2>{name}</h2>
          <p className="text-task">{text}</p>
          <div className="edit">
            <img src={edit} onClick={() => openEditor(index)} alt="" />
            <input {...paramCheck} />
            <img src={delet} onClick={() => delTask(index)} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
