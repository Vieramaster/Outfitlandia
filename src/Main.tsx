import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";

const root = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Header />
    <HomePage />
  </StrictMode>
);
