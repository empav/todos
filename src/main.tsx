import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import worker from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
