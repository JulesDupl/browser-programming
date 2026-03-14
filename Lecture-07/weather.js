// ── UI References ─────────────────────────────────────────
const cityText        = document.getElementById("city");
const temperatureText = document.getElementById("temperature");
const windText        = document.getElementById("wind");
const output          = document.getElementById("output");
const weatherBox      = document.getElementById("weatherBox");
const statusEl        = document.getElementById("weather-status");

// ── Helper functions ──────────────────────────────────────
function log(message) {
    output.textContent += message + "\n";
}

function clearOutput() {
    output.textContent = "";
}

function setStatus(text, type = "") {
    statusEl.textContent = text;
    statusEl.className = "api-status " + type;
}

// ── City buttons ──────────────────────────────────────────
// All city buttons share the same handler via data attributes.
// No need to write a separate onclick for each city.
document.querySelectorAll(".city-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {

        // Highlight active button
        document.querySelectorAll(".city-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const city = btn.dataset.city;
        const lat  = btn.dataset.lat;
        const lon  = btn.dataset.lon;

        loadWeatherByCity(city, lat, lon);
    });
});

// ── Main fetch function ───────────────────────────────────

// Why do we use async/await?
// The fetch() call contacts a remote server — that takes time.
// async/await lets us wait for the response without blocking the browser
// or writing nested .then() callbacks. The code reads top-to-bottom like
// normal synchronous code, which is much easier to follow and maintain.

// Why do we check response.ok?
// fetch() only throws an error for network failures (no internet, DNS error, etc.).
// If the server responds with a 404 or 500, the Promise still *resolves* normally —
// no error is thrown. Checking response.ok lets us catch those HTTP-level problems
// ourselves and show the user a clear message instead of trying to read broken data.

// Why do we use try/catch?
// To handle any failure — whether it's a network issue, a bad HTTP status we threw
// manually, or a JSON parsing problem — in one single place. Without try/catch,
// a rejected Promise would fail silently and the user would see nothing.

async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput();
    weatherBox.hidden = true;
    setStatus("Loading weather for " + cityName + "…", "loading");

    try {
        // Build the API URL with the city's coordinates
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,wind_speed_10m";

        // Send the request and wait for the response
        const response = await fetch(url);

        // Check that the server returned a success code (200–299)
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        // Parse the JSON body — this is also asynchronous
        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const wind        = data.current.wind_speed_10m;

        // Update the weather card in the DOM
        cityText.textContent        = cityName;
        temperatureText.textContent = temperature + " °C";
        windText.textContent        = wind + " km/h";
        weatherBox.hidden = false;

        // Log to the console panel
        log("City:        " + cityName);
        log("Temperature: " + temperature + " °C");
        log("Wind Speed:  " + wind + " km/h");

        setStatus("Data loaded successfully.", "success");

    } catch (error) {
        setStatus("Error loading data", "error");
        log("Error: " + error.message);
        console.error("Weather fetch error:", error);
    }
}

// ── Last updated date ─────────────────────────────────────
const lastUpdatedEl = document.getElementById("last-updated");
if (lastUpdatedEl) {
    const today = new Date();
    lastUpdatedEl.textContent = "Last updated: " + today.toISOString().split("T")[0];
}