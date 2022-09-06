import React, { useState } from "react";
import good from "../../img/good.png";
import close from "../../img/close.png";
import "./EditTask.scss";
import "../Task/Task.scss";

const EditTask = ({ index, item, allTasks, changeBD, openEditor }) => {
  const [dataNew, dataEdit] = useState({
    name: item.name,
    text: item.text,
  });

  const { name, text } = dataNew;

  const updateBD = (id) => {
    if (name.trim()) {
      allTasks[id].name = name.trim();
      allTasks[id].text = text.trim() ? text.trim() : "Описание отсутствует";
      allTasks[id].editor = !allTasks[id].editor;
      changeBD(id);
    } else {
      alert('Поле "Задача" пустое!!!');
    }
  };

  return (
    <div className="page">
      <div className="editName">
        <h2>Change:</h2>
        <textarea
          rows="2"
          className="sizeName"
          value={name}
          onChange={(event) =>
            dataEdit({ name: event.target.value, text: text })
          }
        />
      </div>

      {text.trim() === "Описание отсутствует" ? (
        <textarea
          rows="4"
          className="editText"
          placeholder={text}
          onChange={(event) =>
            dataEdit({ name: name, text: event.target.value })
          }
        />
      ) : (
        <textarea
          rows="4"
          className="editText"
          value={text}
          onChange={(event) =>
            dataEdit({ name: name, text: event.target.value })
          }
        />
      )}

      <div className="edit">
        <img src={good} onClick={() => updateBD(index)} alt="edit" />
        <img src={close} onClick={() => openEditor(index)} alt="close" />
      </div>
    </div>
  );
};

export default EditTask;
