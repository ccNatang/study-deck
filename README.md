# My Study Deck App

This is a flashcard application I built to practice React. It helps you study by letting you flip through cards to see questions and answers.

I used **JSON Server** to act as a fake backend, so the app can actually fetch and save data like a real full-stack application would.

## Technologies I Used
* **React** (for the UI)
* **React Router** (to handle navigation between pages)
* **JSON Server** (to store the flashcard data)
*
## How to Run It

I set up a script to run both the frontend and the backend at the same time.

1.  Clone the repo and go into the folder.
2.  Install the packages:
    ```bash
    npm install
    ```
3.  Start the app:
    ```bash
    npm start
    ```

This command uses `concurrently` to launch:
* The React app on `http://localhost:3000`
* The JSON server on `http://localhost:8080` (This is where the data comes from)