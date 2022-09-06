/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import MainPage from "./components/Main/MainPage";
import EditNewPage from "./components/EditNewPage/EditNewPage";

const App = () => {
  const dispatch = useDispatch();

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
    await axios.get(`/allTasks`).then((res) => {
      dispatch({ type: "ADD_CASH", playload: sortAndAddEditor(res.data.data) });
    });
  }, [1]);

  const changeBD = async (index) => {
    const { _id, name, text, isCheck } = allTasks[index];
    await axios
      .patch("http://localhost:9000/updateTask", {
        _id,
        name,
        text,
        isCheck,
      })
      .then((res) => {
        dispatch({
          type: "ADD_CASH",
          playload: sortAndAddEditor(res.data.data),
        });
      });
  };

  const openEditor = (index) => {
    allTasks[index].editor = !allTasks[index].editor;
    dispatch({ type: "ADD_CASH", playload: [...allTasks] });
  };

  const delTask = async (index) => {
    await axios
      .delete(`http://localhost:9000/deleteTask?_id=${allTasks[index]._id}`)
      .then((res) => {
        dispatch({
          type: "ADD_CASH",
          playload: sortAndAddEditor(res.data.data),
        });
      });
  };

  return (
    <Switch>
      <Route path="/main">
        <MainPage
          allTasks={allTasks}
          changeBD={changeBD}
          openEditor={openEditor}
          delTask={delTask}
          sortAndAddEditor={sortAndAddEditor}
        />
      </Route>
      <Route path="/edit/:id">
        <EditNewPage sortAndAddEditor={sortAndAddEditor} />
      </Route>
      <Redirect from="" to="/main" />
    </Switch>
  );
};

export default App;
