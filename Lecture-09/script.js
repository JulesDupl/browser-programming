// Task 1 & 2 — fetch message and show all fields
function getMessage() {
  const output = document.getElementById("output");
  output.innerText = "Loading..."; // bonus: loading text
 
  fetch("http://localhost:3000/api/message")
    .then(response => response.json())
    .then(data => {
      // bonus: format date
      const formattedTime = new Date(data.time).toLocaleString();
 
      // Task 2 — show all fields in UI
      output.innerHTML =
        "<strong>Message:</strong> " + data.message + "<br>" +
        "<strong>Course:</strong> " + data.course + "<br>" +
        "<strong>Year:</strong> " + data.year + "<br>" +
        "<strong>Time:</strong> " + formattedTime; // bonus: show time
    })
    .catch(error => {
      output.innerText = "Error: could not reach the server."; // bonus: error message
      console.error("Error:", error);
    });
}
 
// Task 3 — fetch student and show in UI
function getStudent() {
  const studentOutput = document.getElementById("student-output");
  studentOutput.innerText = "Loading...";
 
  fetch("http://localhost:3000/api/student")
    .then(response => response.json())
    .then(data => {
      studentOutput.innerHTML =
        "<strong>Name:</strong> " + data.name + "<br>" +
        "<strong>Role:</strong> " + data.role;
    })
    .catch(error => {
      studentOutput.innerText = "Error: could not reach the server.";
      console.error("Error:", error);
    });
}