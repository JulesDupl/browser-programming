// Get references to UI elements
const output = document.getElementById("output");
const statusText = document.getElementById("status");

// Helper function to print text
function log(message) {
    output.textContent += message + "\n";
}

// Helper function to clear output
function clearOutput() {
    output.textContent = "";
}

// Helper function to update status
function setStatus(text) {
    statusText.textContent = "Status: " + text;
}

/* ==========================================================
   1) ASYNC TIMEOUT
   ========================================================== */

// This demonstrates that JavaScript does NOT wait.
// setTimeout schedules a task for later.
document.getElementById("btnTimeout").onclick = function () {

    clearOutput();
    log("Start");

    // This does NOT block the program.
    // It tells the browser: "Run this after 2 seconds"
    setTimeout(function () {
        log("Timeout finished after 2 seconds");
    }, 2000);

    log("End");
};

/* ==========================================================
   2) ASYNC PROMISE
   ========================================================== */

// A Promise represents a value that will arrive in the future.
function waitOneSecond() {

    // We create and return a Promise object.
    return new Promise(function (resolve) {

        // After 1 second, resolve the Promise.
        setTimeout(function () {
            resolve("Promise resolved!");
        }, 1000);
    });
}

document.getElementById("btnPromise").onclick = function () {

    clearOutput();
    setStatus("Waiting (Promise)...");

    // .then() runs AFTER the Promise is completed.
    waitOneSecond().then(function (result) {
        log(result);
        setStatus("Idle");
    });
};

/* ==========================================================
   3) ASYNC / AWAIT
   ========================================================== */

// async/await is a modern way to work with Promises.
// It makes asynchronous code look more readable.

async function runAwaitExample() {

    clearOutput();
    setStatus("Waiting (await)...");

    // 'await' pauses this function until the Promise resolves.
    // It does NOT freeze the browser.
    const result = await waitOneSecond();

    log(result);
    setStatus("Idle");
}

document.getElementById("btnAwait").onclick = runAwaitExample;

/* ==========================================================
   4) ASYNC FETCH (REAL WORLD)
   ========================================================== */

// Fetch is used to get data from the internet (API).
// It returns a Promise.

async function runFetchExample() {

    clearOutput();
    setStatus("Loading from API...");

    try {

        // Send request to server
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        // Check if HTTP status is OK (200–299)
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        // Convert response body to JSON (this is also async!)
        const data = await response.json();

        log("Title: " + data.title);
        log("Completed: " + data.completed);

    } catch (error) {

        // This runs if network fails or we throw manually
        log("Error: " + error.message);

    } finally {

        // finally always runs (success or error)
        setStatus("Idle");
    }
}

document.getElementById("btnFetch").onclick = runFetchExample;