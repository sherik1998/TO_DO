import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import { Box, TextField, Container, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "../LoginRegist.scss";

const PORT = process.env.REACT_APP_PORT;

const Registration = () => {
  const dispatch = useDispatch();

  const [dataReg, dataRegEdit] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    status: "",
  });

  const history = useHistory();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const state = {
    vertical: "top",
    horizontal: "center",
  };

  const { message, status } = snackbar;
  const { vertical, horizontal } = state;
  const { name, email, password, rePassword } = dataReg;

  const snackbarParams = (message, status) => {
    setSnackbar({
      message,
      status,
    });
    handleClick();
  };

  const loginSystem = () => {
    if (password === rePassword) {
      axios
        .post(`${PORT}/user/register`, {
          name: name,
          email: email,
          password: password,
        })
        .then((results) => {
          localStorage.setItem(
            "token",
            `Bearer ${results.data.token.accessToken}`
          );
          dispatch({
            type: "USER",
            payload: results.data,
          });
          history.push("/main");
        })
        .catch((err) => {
          dataRegEdit({
            login: "",
            password: "",
            rePassword: "",
          });
          snackbarParams("Email занят!!!", "error");
        });
    } else {
      dataRegEdit({
        email,
        password,
        rePassword: "",
      });
      snackbarParams("Пароли не совпадают!", "warning");
    }
  };

  return (
    <div className="login-main">
      <Container className="container-style">
        <Box className="box-style">
          <div className="group-login">
            <h1>Регистрация</h1>
            <p>Name:</p>
            <TextField
              id="outlined-required"
              value={name}
              onChange={(event) =>
                dataRegEdit({
                  name: event.target.value,
                  email,
                  password,
                  rePassword,
                })
              }
            />
            <p>Email:</p>
            <TextField
              id="outlined-required"
              value={email}
              onChange={(event) =>
                dataRegEdit({
                  email: event.target.value,
                  password,
                  rePassword,
                  name,
                })
              }
            />
            <p>Password:</p>
            <TextField
              hiddenLabel
              id="outlined-password-input-1"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                dataRegEdit({
                  email,
                  password: event.target.value,
                  rePassword,
                  name,
                })
              }
            />
            <p>Repeat password:</p>
            <TextField
              hiddenLabel
              id="outlined-password-input-2"
              type="password"
              autoComplete="current-password"
              value={rePassword}
              onChange={(event) =>
                dataRegEdit({
                  email,
                  password,
                  rePassword: event.target.value,
                  name,
                })
              }
            />
          </div>
          <div className="group-button">
            <Button
              className="button-style"
              variant="outlined"
              onClick={() => loginSystem()}
            >
              Зарегистрироваться
            </Button>
            <Button
              className="button-style"
              variant="text"
              onClick={() => history.push("/login")}
            >
              Авторизоваться
            </Button>
          </div>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status} className="alert-style">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
