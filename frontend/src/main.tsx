import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { EntryProvider } from "./utilities/globalContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EntryProvider>
      <App />
    </EntryProvider>
  </React.StrictMode>
);
