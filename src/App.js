import React, { useState, useEffect } from "react";

import recordService from "./services/record";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import RecordTable from "./components/RecordTable";

import { initializeRecords } from "./reducers/recordReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      recordService.setToken(user.token);
      recordService.getAll().then((res) => dispatch(initializeRecords(res)));
    }
  }, [dispatch]);

  const loginHandler = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      recordService.setToken(user.token);
      recordService.getAll().then((res) => dispatch(initializeRecords(res)));
    } catch (exception) {
      console.log(exception);
    }
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
        <LoginForm handleSubmit={loginHandler} />
      ) : (
        <div>
          <p>
            <b>{user.name}</b> logged-in{" "}
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
