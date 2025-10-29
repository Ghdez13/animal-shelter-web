import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // React Router for SPA routing

import App from "./App.jsx"; // Main app component
import "./index.css"; // Global CSS
import "./i18n.js"; // i18n initialization

// Create root and render the application
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/* Main SPA component */}
    </BrowserRouter>
  </StrictMode>
);
