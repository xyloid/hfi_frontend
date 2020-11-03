import React, { useState, useEffect } from "react";

import recordService from "./services/record";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import RecordTable from "./components/RecordTable";

import { initializeRecords } from "./reducers/recordReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      recordService.setToken(user.token);
      recordService.getAll().then((res) => dispatch(initializeRecords(res)));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      recordService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      recordService.getAll().then((res) => dispatch(initializeRecords(res)));
    } catch (exception) {
      console.log(exception);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  };

  // handle logout
  const logoutHandler = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <div className="container">
      <h1>HFI Data Viewer</h1>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in{" "}
            <button onClick={logoutHandler}>logout</button>
          </p>
        </div>
      )}

      {user === null ? (
        <div>Please login to view the data</div>
      ) : (
        <RecordTable />
      )}
    </div>
  );
};

export default App;
