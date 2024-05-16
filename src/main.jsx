import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header/Header.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
const queryClient = new QueryClient();
createRoot(document.querySelector("#root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Header />
      <HomePage />
    </StrictMode>
  </QueryClientProvider>
);
