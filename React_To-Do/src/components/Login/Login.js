import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";
import { Box, TextField, Container, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "../LoginRegist.scss";

const PORT = process.env.REACT_APP_PORT;

const Login = () => {
  const dispatch = useDispatch();

  const [dataLogin, dataLoginEdit] = useState({
    email: "",
    password: "",
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
  const { email, password } = dataLogin;

  const loginSystem = async () => {
    await axios
      .post(`${PORT}/user/login`, {
        email: email,
        password: password,
      })
      .then(async (results) => {
        localStorage.setItem(
          "token",
          `Bearer ${results.data.token.accessToken}`
        );
        dispatch({
          type: "USER",
          playload: results.data,
        });
        history.push("/main");
      })
      .catch((err) => {
        setSnackbar({
          message: "Неверный логин или пароль!!!",
          status: "error",
        });
        dataLoginEdit({
          email: "",
          password: "",
        });
        handleClick();
      });
  };

  return (
    <div className="login-main">
      <Container className="container-style">
        <Box className="box-style">
          <div className="group-login">
            <h1>Войти в систему</h1>
            <p>Email:</p>
            <TextField
              id="outlined-required"
              value={email}
              onChange={(event) =>
                dataLoginEdit({
                  email: event.target.value,
                  password,
                })
              }
            />
            <p>Password:</p>
            <TextField
              hiddenLabel
              id="outlined-password-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                dataLoginEdit({
                  email,
                  password: event.target.value,
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
              Войти
            </Button>
            <Button
              className="button-style"
              variant="text"
              onClick={() => history.push("/registration")}
            >
              Зарегистрироваться
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

export default Login;
