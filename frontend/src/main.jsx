import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";

// Enable mocked API only when explicitly toggled
if (import.meta.env.VITE_USE_MOCK === "true") {
  import("./lib/mock-api");
}

// Suppress noisy third-party fetch failures during dev (e.g. FullStory) to avoid breaking HMR
if (import.meta.env.DEV) {
  window.addEventListener("unhandledrejection", (e) => {
    try {
      const reason = e.reason || {};
      const msg = reason && reason.message ? reason.message : "";
      const stack = reason && reason.stack ? reason.stack : "";
      if (
        msg.includes("Failed to fetch") ||
        stack.includes("edge.fullstory.com") ||
        stack.includes("fs.js")
      ) {
        e.preventDefault();
        console.warn("Suppressed third-party fetch error in dev:", reason);
      }
    } catch (err) {}
  });

  // Hard-disable FullStory network calls in dev to avoid noisy errors
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    try {
      const url = String(args[0] || "");
      if (url.includes("edge.fullstory.com") || url.includes("/s/fs.js")) {
        return new Response("", { status: 204 });
      }
      return await nativeFetch(...args);
    } catch (err) {
      const msg = (err && err.message) || "";
      const stack = (err && err.stack) || "";
      if (
        msg.includes("Failed to fetch") &&
        (stack.includes("edge.fullstory.com") || stack.includes("fs.js"))
      ) {
        return new Response("", { status: 204 });
      }
      throw err;
    }
  };
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
