/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import good from "../../img/good.png";
import close from "../../img/close.png";
import "./EditNewPage.scss";

const PORT = process.env.REACT_APP_PORT;

const EditNewPage = ({ getAllTasks }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.task);

  const token = localStorage.getItem("token");

  const { name, text } = task;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${PORT}/task/${id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        const { name, text } = res.data;
        dispatch({
          type: "TASK",
          payload: { name, text },
        });
      })
      .catch((err) => {
        history.push("/main");
        getAllTasks();
      });
  }, [1]);

  const changeBDNew = () => {
    if (name.trim()) {
      axios
        .patch(
          `${PORT}/task`,
          {
            id: id,
            name: name.trim(),
            text: !text.trim() ? "Описание отсутствует" : text,
            isCheck: false,
          },
          {
            headers: { authorization: token },
          }
        )
        .then(() => {
          getAllTasks();
        });
      dispatch({
        type: "TASK",
        payload: { name: "", text: "" },
      });
      history.push("/main");
    } else {
      alert('Поле "Задача" пустое!!!');
    }
  };

  return (
    <div className="pageNew">
      <div className="editName">
        <h2>Change:</h2>
        <textarea
          rows="3"
          className="sizeName"
          value={name}
          onChange={(event) =>
            dispatch({
              type: "TASK",
              payload: { name: event.target.value, text },
            })
          }
        />
      </div>
      <p>Change description:</p>
      {text.trim() === "Описание отсутствует" ? (
        <textarea
          rows="10"
          className="editText"
          placeholder={text}
          onChange={(event) =>
            dispatch({
              type: "TASK",
              payload: { name, text: event.target.value },
            })
          }
        />
      ) : (
        <textarea
          rows="10"
          className="editText"
          value={text}
          onChange={(event) =>
            dispatch({
              type: "TASK",
              payload: { name, text: event.target.value },
            })
          }
        />
      )}

      <div className="edit">
        <img src={good} onClick={() => changeBDNew()} alt="" />
        <img
          src={close}
          onClick={() => {
            dispatch({
              type: "TASK",
              payload: { name: "", text: "" },
            });
            history.push("/main");
          }}
          alt=""
        />
      </div>
    </div>
  );
};

export default EditNewPage;
