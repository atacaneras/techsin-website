import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
