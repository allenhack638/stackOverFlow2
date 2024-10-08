import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers";
import { Toaster } from "react-hot-toast";

const store = createStore(Reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
