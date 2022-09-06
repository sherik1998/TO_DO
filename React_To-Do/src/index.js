import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

const defaultState = {
  allTasks: [],
  task: {
    name: "",
    text: "",
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CASH":
      return { ...state, allTasks: action.playload };
    case "TASK":
      return { ...state, task: action.playload };
    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
