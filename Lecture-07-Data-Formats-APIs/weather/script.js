const cityText        = document.getElementById("city")
const temperatureText = document.getElementById("temperature")
const windText        = document.getElementById("wind")
const timeText        = document.getElementById("time")
const output          = document.getElementById("output")

function log(message) {
    output.textContent += message + "\n"
}

function clearOutput() {
    output.textContent = ""
}

// Extension Task 1 — three city buttons
document.getElementById("btnKuopio").onclick   = function() { loadWeatherByCity("Kuopio",   62.8924, 27.6770) }
document.getElementById("btnHelsinki").onclick = function() { loadWeatherByCity("Helsinki", 60.1699, 24.9384) }
document.getElementById("btnOulu").onclick     = function() { loadWeatherByCity("Oulu",     65.0121, 25.4651) }

// Extension Task 1 — reusable function for any city
async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput()

    try {

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,wind_speed_10m&timeformat=iso8601"
        )

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status)
        }

        const data = await response.json()

        const temperature = data.current.temperature_2m
        const wind        = data.current.wind_speed_10m
        const time        = data.current.time        // Extension Task 2

        // Update the DOM
        cityText.textContent        = cityName
        temperatureText.textContent = temperature + " °C"
        windText.textContent        = wind + " km/h"
        timeText.textContent        = time             // Extension Task 2

        // Extension Task 3 — change background based on temperature
        if (temperature < 0) {
            document.body.className = "cold"
        } else {
            document.body.className = "mild"
        }

        // Log to output area
        //log("City: "        + cityName)
        //log("Temperature: " + temperature + " °C")
        //log("Wind Speed: "  + wind + " km/h")
        //log("Time: "        + time)

    } catch (error) {
        log("Error: " + error.message)
    }
}