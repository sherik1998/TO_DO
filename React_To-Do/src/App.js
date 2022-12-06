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

  const user = useSelector((state) => state.user);

  const getTasks = () => {
    axios
      .get(`${PORT}/task/all`, {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch({
          type: "ADD_CASH",
          payload: sortAndAddEditor(res.data),
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
        }
        history.push("");
      });
  };

  const setUser = (taskId, userId) => {
    axios
      .patch(
        `${PORT}/task/set_user`,
        {
          taskId,
          userId,
        },
        {
          headers: { authorization: token },
        }
      )
      .then(() => {
        getTasks();
      });
  };

  const sortAndAddEditor = (tasks) => {
    let newAllTasks = tasks;

    newAllTasks.map((task) => (task.editor = false));
    newAllTasks = newAllTasks.sort((obj1, obj2) => {
      return obj1.isCheck - obj2.isCheck;
    });

    return newAllTasks;
  };

  const startTask = async (taskId) => {
    await axios.patch(
      `${PORT}/task/start`,
      { taskId },
      {
        headers: { authorization: token },
      }
    );
  };

  const endTask = (taskId) => {
    axios
      .patch(
        `${PORT}/task/end`,
        { taskId },
        {
          headers: { authorization: token },
        }
      )
      .then(() => {
        getAllTasks();
      });
  };

  useEffect(() => {
    getUsers();
    getAllTasks();
  }, [user]);

  const getUsers = () => {
    axios
      .get(`${PORT}/user/all`, {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch({
          type: "USERS",
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
        }
        history.push("");
      });
  };

  const getAllTasks = () => {
    axios
      .get(`${PORT}/task`, {
        headers: { authorization: token },
      })
      .then((res) => {
        dispatch({
          type: "ADD_CASH",
          payload: sortAndAddEditor(res.data),
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          localStorage.clear();
        }
        history.push("");
      });
  };

  const changeBD = (index) => {
    const { id, name, text, isCheck } = allTasks[index];
    axios
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
      .then(() => {
        getAllTasks();
      });
  };

  const openEditor = (index) => {
    allTasks[index].editor = !allTasks[index].editor;
    dispatch({ type: "ADD_CASH", payload: [...allTasks] });
  };

  const delTask = (index) => {
    axios
      .delete(`${PORT}/task/one/${allTasks[index].id}`, {
        headers: { authorization: token },
      })
      .then(() => {
        getAllTasks();
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
          getAllTasks={getAllTasks}
          getTasks={getTasks}
          setUser={setUser}
          startTask={startTask}
          endTask={endTask}
        />
      </Route>
      <Route path="/edit/:id">
        <EditNewPage getAllTasks={getAllTasks} />
      </Route>
      <Redirect from="" to="/login" />
    </Switch>
  );
};

export default App;
