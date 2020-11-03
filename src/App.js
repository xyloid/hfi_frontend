import React, { useState, useEffect } from "react";

import recordService from "./services/record";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import RecordTable from "./components/RecordTable";
import { Button, Navbar, Nav } from "react-bootstrap";

import { initializeRecords } from "./reducers/recordReducer";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

  const padding = {
    padding: 5,
  };

  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  home
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? (
                  <em>
                    {user.name} logged in
                    <Button variant="primary" onClick={logoutHandler}>
                      logout
                    </Button>
                  </em>
                ) : (
                  <Link to="/login">login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/login">
            <div>
              {user === null ? (
                <LoginForm handleSubmit={loginHandler} />
              ) : (
                <div>
                  <p>
                    <b>{user.name}</b> logged-in{" "}
                  </p>
                </div>
              )}
            </div>
          </Route>
          <Route path="/">
            {user === null ? (
              <div>Please login to view the data</div>
            ) : (
              <RecordTable />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
