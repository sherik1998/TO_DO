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
  user: { name: "" },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CASH":
      return { ...state, allTasks: action.payload };
    case "TASK":
      return { ...state, task: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    case "USERS":
      return { ...state, users: action.payload };
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
