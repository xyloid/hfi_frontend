import React, { useState, useEffect } from "react";

import dataService from "./services/data";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (user != null) {
      const d = await dataService.getAll();
      setData(d);
    }
  }, []);

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      setUser(user);
      dataService.setToken(user.token);
      const d = await dataService.getAll();
      setData(d);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dataService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      const d = await dataService.getAll();
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

  return (
    <div>
      <p>HFI Assessment</p>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logoutHandler}>logout</button>
        </div>
      )}

      {user === null ? (
        <div>Please login to view the data</div>
      ) : (
        <div>
          <h2>Data</h2>
          <ol>
            {data.map((d) => (
              <li key={d.id}>
                {d.name}, {d.gender}, {d.age}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default App;
