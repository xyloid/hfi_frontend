import React, { useState, useEffect } from "react";

import dataService from "./services/data";
import loginService from "./services/login";

const App = () => {
  const [data, setData] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const d = await dataService.getAll();
    setData(d);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
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
  );
};

export default App;
