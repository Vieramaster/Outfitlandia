import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header/Header";
import HomePage from "./Components/HomePage/HomePage";
import "./index.css";


createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <Header />
    <HomePage />
  </StrictMode>
);
