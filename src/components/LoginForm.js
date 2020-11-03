import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    console.log(username, password);
    handleSubmit(username, password);
    setUsername("");
    setPassword("");
    // history.push("/");
  };

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={login} style={{ width: "200px" }}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
