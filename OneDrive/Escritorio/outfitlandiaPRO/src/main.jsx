import React from "react";
import ReactDOM from "react-dom/client";
import Header from "../src/Components/Header/Header";
import HomePage from "../src/Components/HomePage/HomePage";
import "./index.css";

ReactDOM.createRoot(
  /** @type {HTMLDivElement} */ (document.getElementById("root")),
).render(
  <React.StrictMode>
    <Header />
    <HomePage />
  </React.StrictMode>,
);
