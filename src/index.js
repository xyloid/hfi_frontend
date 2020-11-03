import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import recordReducer from "./reducers/recordReducer";

import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(recordReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
