import React from "react";
import Task from "../Task/Task";
import EditTask from "../EditTask/EditTask";
import "./TaskList.scss";

const TaskList = ({
  allTasks,
  changeBD,
  openEditor,
  delTask,
  setUser,
  startTask,
  endTask,
}) => {
  return (
    <div id="content-page">
      {allTasks.map((item, index) => {
        if (item.editor) {
          return (
            <EditTask
              key={`task-${item.id}`}
              index={index}
              item={item}
              allTasks={allTasks}
              changeBD={changeBD}
              openEditor={openEditor}
            />
          );
        } else {
          return (
            <Task
              key={`task-${item.id}`}
              index={index}
              item={item}
              allTasks={allTasks}
              changeBD={changeBD}
              openEditor={openEditor}
              delTask={delTask}
              setUser={setUser}
              startTask={startTask}
              endTask={endTask}
            />
          );
        }
      })}
    </div>
  );
};

export default TaskList;
