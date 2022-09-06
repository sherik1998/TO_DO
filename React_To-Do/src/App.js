/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import axios from "axios";
import MainPage from "./components/Main/MainPage";
import EditNewPage from "./components/EditNewPage/EditNewPage";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

const PORT = process.env.REACT_APP_PORT;

const App = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const history = useHistory();

  const allTasks = useSelector((state) => state.allTasks);

  const sortAndAddEditor = (tasks) => {
    let newAllTasks = tasks;

    newAllTasks.map((task) => (task.editor = false));
    newAllTasks = newAllTasks.sort((obj1, obj2) => {
      return obj1.isCheck - obj2.isCheck;
    });

    return newAllTasks;
  };

  useEffect(async () => {
    await getAllTasks();
  }, [1]);

  const getAllTasks = async () => {
    await axios
      .get(`${PORT}/task`, {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch({
          type: "ADD_CASH",
          playload: sortAndAddEditor(res.data),
        });
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          localStorage.clear();
        }
        history.push("");
      });
  };

  const changeBD = async (index) => {
    const { id, name, text, isCheck } = allTasks[index];
    await axios
      .patch(
        `${PORT}/task`,
        {
          id,
          name,
          text,
          isCheck,
        },
        {
          headers: { authorization: token },
        }
      )
      .then(async () => {
        await getAllTasks();
      });
  };

  const openEditor = (index) => {
    allTasks[index].editor = !allTasks[index].editor;
    dispatch({ type: "ADD_CASH", playload: [...allTasks] });
  };

  const delTask = async (index) => {
    await axios
      .delete(`${PORT}/task/one/${allTasks[index].id}`, {
        headers: { authorization: token },
      })
      .then(async () => {
        await getAllTasks();
      });
  };

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/registration">
        <Registration />
      </Route>
      <Route path="/main">
        <MainPage
          allTasks={allTasks}
          changeBD={changeBD}
          openEditor={openEditor}
          delTask={delTask}
          sortAndAddEditor={sortAndAddEditor}
          getAllTasks={getAllTasks}
        />
      </Route>
      <Route path="/edit/:id">
        <EditNewPage sortAndAddEditor={sortAndAddEditor} />
      </Route>
      <Redirect from="" to="/login" />
    </Switch>
  );
};

export default App;
