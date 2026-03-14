// Get references to UI elements
const output = document.getElementById("output");
const list = document.getElementById("userList");

// Helper: print a line in the <pre> output
function log(text) {
    output.textContent += text + "\n";
}

// Helper: clear the output area
function clearOutput() {
    output.textContent = "";
}

// Link the button to the function
document.getElementById("btnLoadUsers").onclick = loadUsers;

/* ==========================================================
   MAIN FUNCTION — Parts A, B, C, D, E
   ========================================================== */

async function loadUsers() {

    clearOutput();
    list.innerHTML = ""; // Part E — clear the list

    try {

        // Part A — Fetch data from the API
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Part C — Check HTTP status
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        // Part A — Parse JSON body into a JavaScript array
        const users = await response.json();

        // Part B — Loop through each user
        users.forEach(function (user) {

            // Part B — Access fields (city is nested inside address)
            const name  = user.name;
            const email = user.email;
            const city  = user.address.city;

            const line = name + " - " + email + " - " + city;

            // Part B — Print in the <pre> output
            //log(line);

            // Part E — Also add a list item to the <ul>
            const li = document.createElement("li");
            li.textContent = line;
            list.appendChild(li);
        });

    } catch (error) {

        // Part C/D — Catch network errors or bad HTTP status
        log("Error: " + error.message);
    }
}
