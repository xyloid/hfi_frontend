import React, { useState, useEffect } from "react";

import dataService from "./services/data";
import loginService from "./services/login";

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

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      console.log(user);
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      <p>HFI Assessment</p>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
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
                {" "}
                {d.name}, {d.gender}, {d.age}{" "}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default App;
