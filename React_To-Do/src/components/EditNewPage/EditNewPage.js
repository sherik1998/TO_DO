import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import good from "../../img/good.png";
import close from "../../img/close.png";
import "./EditNewPage.scss";

const EditNewPage = ({ sortAndAddEditor }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.task);

  const { name, text } = task;

  const history = useHistory();

  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios.get(`http://localhost:9000/oneTask?_id=${id}`).then((res) => {
      const { name, text } = res.data.data;
      dispatch({
        type: "TASK",
        playload: { name, text },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeBDNew = async () => {
    if (name.trim()) {
      await axios
        .patch("http://localhost:9000/updateTask", {
          _id: id,
          name: name.trim(),
          text: !text.trim() ? "Описание отсутствует" : text,
          isCheck: false,
        })
        .then((res) => {
          dispatch({
            type: "ADD_CASH",
            playload: sortAndAddEditor(res.data.data),
          });
        });
      dispatch({
        type: "TASK",
        playload: { name: "", text: "" },
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
              playload: { name: event.target.value, text },
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
              playload: { name, text: event.target.value },
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
              playload: { name, text: event.target.value },
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
              playload: { name: "", text: "" },
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
