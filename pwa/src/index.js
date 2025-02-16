import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import InactivityHandler from "./components/InactivityHandler";
ReactDOM.render(
  <BrowserRouter>
    <InactivityHandler />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
