import React, { useState, useEffect } from "react";

import recordService from "./services/record";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

import BootstrapTable from "react-bootstrap-table-next";

import {
  getAll,
  fetchSingleRecord,
  initializeRecords,
} from "./reducers/recordReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state);

  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (user != null) {
      const d = await recordService.getAll();
      setData(d);
    }
  }, []);

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      setUser(user);
      recordService.setToken(user.token);
      const d = await recordService.getAll();
      setData(d);

      recordService.getAll().then((res) => dispatch(initializeRecords(res)));
      console.log(records);
      console.log(data);
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
      const d = await recordService.getAll();
      setData(d);
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

  // for expandable table
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "gender",
      text: "Gender",
    },
    {
      dataField: "age",
      text: "Age",
    },
    {
      dataField: "caseStatus",
      text: "Case Status",
    },
    {
      dataField: "plan",
      text: "Plan",
    },
  ];

  const expandRow = {
    renderer: (row) => {
      return (
        <div>
          Status History of {row.name}
          <p>{console.log(row)}</p>
        </div>
      );
    },
    onExpand: (row, isExpand, rowIndex, e) => {
      if (isExpand) {
        dispatch(fetchSingleRecord(row.id));
      }
    },
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
        <div>
          <BootstrapTable
            keyField="id"
            data={records}
            columns={columns}
            expandRow={expandRow}
          ></BootstrapTable>
        </div>
      )}
    </div>
  );
};

export default App;
