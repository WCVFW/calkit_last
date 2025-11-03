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

// Global safeguard: prevent accidental full-page navigations or reloads
// - Prevent native form submissions unless form has data-allow-submit
// - Prevent anchor clicks for href="#" or empty href
(function setupGlobalGuards(){
  if (typeof window !== 'undefined') {
    // Prevent forms from performing a full page submit by default
    window.addEventListener('submit', function (e) {
      try {
        const form = e.target;
        if (form && form.tagName === 'FORM') {
          if (!form.hasAttribute('data-allow-submit')) {
            e.preventDefault();
            // console.debug to help developers understand prevented submits
            // eslint-disable-next-line no-console
            console.debug('Prevented native form submit for', form);
          }
        }
      } catch (err) {
        // ignore
      }
    }, true);

    // Prevent anchors with href="#" or javascript:void(0) or empty href from navigating
    window.addEventListener('click', function (e) {
      try {
        const a = e.target.closest && e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href || href === '#' || href.trim().toLowerCase().startsWith('javascript:')) {
          e.preventDefault();
          // eslint-disable-next-line no-console
          console.debug('Prevented default anchor navigation for', a);
        }
      } catch (err) {
        // ignore
      }
    }, true);
  }
})();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
