console.log("Page loaded"); // Log 1

let isLightMode = false;
let clickCount = 0;

function toggleTheme() {
    isLightMode = !isLightMode;
    document.body.classList.toggle("light");
    console.log("Light mode protocol activated:", isLightMode); // Log 2
}

function countClick() {
    clickCount++;
    console.log("Button clicked", clickCount, "times"); // Log 3
}

const themeBtn = document.getElementById("themeBtn");
const clickBtn = document.getElementById("clickBtn");

themeBtn.addEventListener("click", toggleTheme);
clickBtn.addEventListener("click", countClick);