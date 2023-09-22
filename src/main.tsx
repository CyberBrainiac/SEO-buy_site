import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./App";
import "./assets/styles/myReset.css";
import "./assets/styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootLayout />
  </React.StrictMode>
);
