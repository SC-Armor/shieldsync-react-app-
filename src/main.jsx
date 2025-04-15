import React from "react";
import ReactDOM from "react-dom/client";
import App from "./SR/App.jsx"; // ✅ matches your structure
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
