# Lecture 05 – DOM, State & Browser APIs

## Features Implemented

- **Skills Section:** 7 skill cards displayed in a responsive CSS grid (HTML, CSS, JS, Python, IoT, Git, Linux).
- **Projects Section:** 2 project articles, each with a title, description, and GitHub link.
- **Theme Toggle (Feature A):** Button in the header switches between dark (cyberpunk) and light mode using `classList` and a `isDark` state variable.
- **localStorage Persistence (Feature B):** Theme choice is saved to `localStorage` under the key `"portfolio_theme"` and automatically restored on page load.
- **Last Updated (Feature C):** A `<p id="last-updated">` in the footer is populated by JavaScript with today's date in `YYYY-MM-DD` format on every page load.

## How to Test

1. Open the page — theme from your last visit loads automatically.
2. Click **Toggle Theme** in the header to switch modes. Refresh — it persists.
3. Click **Energy Pulse** and check the browser console (F12) for the live count.
4. Check the footer for the auto-generated "Last updated" date.
