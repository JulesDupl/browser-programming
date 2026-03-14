# Portfolio Update: Async & Fetch

## What was added

A new **External Data Demo** section was added to the portfolio. It fetches a user profile from a public API and displays it on the page.

## How it works

- Click the **Load Data** button
- The page shows "Loading…" while waiting for the response
- Name, Email, and Company are displayed once the data arrives
- If something goes wrong, "Error loading data" is shown

## Code concepts used

**async/await** — Used because fetch() takes time. async/await lets the code wait for the response without freezing the browser.

**response.ok** — A fetch() call does not throw an error on a 404 or 500. Checking response.ok lets us catch those HTTP errors manually.

**try/catch** — Wraps the fetch logic so any error (network failure or a manually thrown one) is caught and shown to the user instead of crashing silently.

## API used

`https://jsonplaceholder.typicode.com/users/1`
