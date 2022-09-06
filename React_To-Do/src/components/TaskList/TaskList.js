import React from "react";
import Task from "../Task/Task";
import EditTask from "../EditTask/EditTask";
import "./TaskList.scss";

const TaskList = ({ allTasks, changeBD, openEditor, delTask }) => {
  return (
    <div id="content-page">
      {allTasks.map((item, index) => {
        if (item.editor) {
          return (
            <EditTask
              key={`task-${index}`}
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
              key={`task-${index}`}
              index={index}
              item={item}
              allTasks={allTasks}
              changeBD={changeBD}
              openEditor={openEditor}
              delTask={delTask}
            />
          );
        }
      })}
    </div>
  );
};

export default TaskList;
