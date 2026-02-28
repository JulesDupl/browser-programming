console.log("Page loaded"); // Log 1

// ── State ──────────────────────────────────────────────
let isDark = true;   // default is dark (cyberpunk theme)
let clickCount = 0;

// ── Feature A: Theme Toggle with localStorage ──────────
const THEME_KEY = "portfolio_theme";

function applyTheme(dark) {
    isDark = dark;
    if (isDark) {
        document.body.classList.remove("light");
    } else {
        document.body.classList.add("light");
    }
    console.log("Theme set to:", isDark ? "dark" : "light"); // Log 2
}

function toggleTheme() {
    applyTheme(!isDark);
    // Save preference to localStorage
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}

// On page load: restore saved theme
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light") {
    applyTheme(false);
} else {
    applyTheme(true); // default dark
}

// ── Feature B: Click Counter ────────────────────────────
function countClick() {
    clickCount++;
    console.log("Energy Pulse fired", clickCount, "times"); // Log 3
}

// ── Event Listeners ─────────────────────────────────────
const themeBtn = document.getElementById("themeBtn");
const clickBtn = document.getElementById("clickBtn");

themeBtn.addEventListener("click", toggleTheme);
clickBtn.addEventListener("click", countClick);

// ── Feature: Last Updated Date ───────────────────────────
const lastUpdatedEl = document.getElementById("last-updated");
if (lastUpdatedEl) {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0]; // YYYY-MM-DD
    lastUpdatedEl.textContent = "Last updated: " + formatted;
}
