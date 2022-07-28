import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "./css/style.css";

import App from "./App";
import { AuthContextProvider } from "./features/authentication/contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App></App>
    </AuthContextProvider>
  </BrowserRouter>
);
