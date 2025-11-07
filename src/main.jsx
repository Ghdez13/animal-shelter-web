import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // React Router for SPA routing
import { HelmetProvider } from "react-helmet-async"; // Helmet for SEO

import App from "./App.jsx"; // Main app component
import "./index.css"; // Global CSS
import "./i18n.js"; // i18n initialization
import i18n from "./i18n.js";

// Fix for mobile 100vh issue (iOS / Android browsers)
const setVh = () => {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
};

setVh(); // Set initial value
window.addEventListener("resize", setVh);

// Create root and render the application
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Suspense
      fallback={<div className="loading-screen">{i18n.t("loading")}</div>}
    >
      <BrowserRouter>
        <HelmetProvider>
          <App /> {/* Main SPA component */}
        </HelmetProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
