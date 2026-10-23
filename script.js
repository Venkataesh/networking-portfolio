
/* =========================================
   VENKATAESH — PORTFOLIO INTERACTIONS
   ========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.querySelector(".theme-label");
const yearElement = document.getElementById("current-year");

const savedTheme = localStorage.getItem("portfolio-theme");

const preferredTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches ? "dark" : "light";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === "dark";

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  if (themeLabel) {
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      isDark ? "#0c1220" : "#f7f9fc"
    );
  }
}

// Use the saved preference, or follow the visitor's device theme.
applyTheme(
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : preferredTheme
);

// Toggle between the two themes.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.dataset.theme || "light";

    const nextTheme =
      currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      // The theme still works if browser storage is unavailable.
    }
  });
}

// Automatically update the footer year.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
