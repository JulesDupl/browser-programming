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

// ── Feature: External Data Demo ──────────────────────────

// Why do we use async/await?
// Because fetch() is asynchronous — it takes time to get data from a server.
// async/await lets us write that waiting logic in a readable, step-by-step style
// without blocking the browser or using deeply nested .then() callbacks.

// Why do we check response.ok?
// A fetch() call only rejects (throws) on network failures.
// If the server returns a 404 or 500, the Promise still *resolves* — no error is thrown.
// Checking response.ok lets us catch those HTTP-level errors ourselves and handle them.

// Why do we use try/catch?
// To gracefully handle both network errors and HTTP errors we throw manually.
// Without try/catch, an unhandled rejection would silently fail or crash our code.

async function loadUserData() {
    const statusEl = document.getElementById("api-status");
    const resultEl = document.getElementById("api-result");

    // Reset UI
    resultEl.hidden = true;
    resultEl.innerHTML = "";
    statusEl.textContent = "Loading…";
    statusEl.className = "api-status loading";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/2");

        // Check that the server returned a successful response
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        // Parse the JSON body (also async)
        const data = await response.json();

        // Build result HTML dynamically — no hardcoded values
        resultEl.innerHTML = `
            <div class="api-card">
                <div class="api-field">
                    <span class="api-label">Name</span>
                    <span class="api-value">${data.name}</span>
                </div>
                <div class="api-field">
                    <span class="api-label">Email</span>
                    <span class="api-value">${data.email}</span>
                </div>
                <div class="api-field">
                    <span class="api-label">Company</span>
                    <span class="api-value">${data.company.name}</span>
                </div>
            </div>
        `;
        resultEl.hidden = false;
        statusEl.textContent = "Data loaded successfully.";
        statusEl.className = "api-status success";

    } catch (error) {
        statusEl.textContent = "Error loading data";
        statusEl.className = "api-status error";
        console.error("Fetch error:", error.message);
    }
}

const loadDataBtn = document.getElementById("loadDataBtn");
if (loadDataBtn) {
    loadDataBtn.addEventListener("click", loadUserData);
}

const lastUpdatedEl = document.getElementById("last-updated");
if (lastUpdatedEl) {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0]; // YYYY-MM-DD
    lastUpdatedEl.textContent = "Last updated: " + formatted;
}
