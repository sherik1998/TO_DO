import React from "react";
import NewTask from "../NewTask/NewTask";
import TaskList from "../TaskList/TaskList";

const MainPage = ({
  allTasks,
  changeBD,
  openEditor,
  delTask,
  getAllTasks,
  getTasks,
  setUser,
  startTask,
  endTask,
}) => {
  return (
    <>
      <NewTask getAllTasks={getAllTasks} getTasks={getTasks} />
      <TaskList
        allTasks={allTasks}
        changeBD={changeBD}
        openEditor={openEditor}
        delTask={delTask}
        setUser={setUser}
        startTask={startTask}
        endTask={endTask}
      />
    </>
  );
};

export default MainPage;
