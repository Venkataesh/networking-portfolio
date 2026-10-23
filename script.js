
/* =========================================
   VENKATAESH — PORTFOLIO INTERACTIONS
   Dark mode by default
   Light/dark toggle with saved preference
   ========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.querySelector(".theme-label");
const yearElement = document.getElementById("current-year");

// Use the visitor's saved preference when available.
// Otherwise, default to dark mode.
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  // Continue normally if browser storage is unavailable.
}

const initialTheme =
  savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : "dark";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === "dark";

  // Update the theme icon.
  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  // Show the action the visitor can take next.
  if (themeLabel) {
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  }

  // Update accessibility information.
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  // Match the browser UI color to the selected theme.
  const themeColorMeta = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      "content",
      isDark ? "#0c1220" : "#f7f9fc"
    );
  }
}

// Apply the initial theme.
applyTheme(initialTheme);

// Switch between dark and light modes.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.dataset.theme || "dark";

    const nextTheme =
      currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    // Remember the visitor's selection.
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      // Theme switching still works without storage.
    }
  });
}

// Keep the footer year up to date.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
