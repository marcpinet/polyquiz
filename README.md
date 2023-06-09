# PS6: Polyquiz

## 📝 Description

Polyquiz is a school project for the course *PS6* at Polytech Nice Sophia. It is a quiz game which aims to be used by
nursing residents to test their physical and mental capabilities.
<br>As an admin or nurse, you can create quizzes, add questions and answers, and assign them to residents. The residents
can then play the quizzes and see their results.

The whole project is being supervised by the [Amadeus](https://amadeus.com/) company.

## 🎥 Demo

https://github.com/marcpinet/polyquiz/assets/52708150/b2a64fcb-29b6-442e-aaca-e464b61bf61d

## 💡 How to use

### Prerequisites

* Node.js (v16.13.0+)

1. Get a copy of the Project. Assuming you have git installed, open your Terminal and enter:

    ```bash
    git clone '<project_url>'
    ```

2. To run locally, you will need to install Angular CLI. Open your Terminal and enter:

    ```bash
    npm install -g @angular/cli
    ```

3. Go to the root of the project. Open your Terminal and install the dependencies:

    ```bash
    npm install && cd backend && npm install && cd ../frontend && npm install && cd ..
    ```
### Running

After that, you can proceed to start the program by running `npm run dev` at the root of the project. This will start
both the backend and the frontend.

### Run the end to end tests

Before running the tests, you need to run your front-end and back-end:

1. Run your backend: `npm run start:e2e`

2. Run your frontend: `npm run start`

3. Run the tests:  `npm run test:e2e`

## Running with Docker

- If you want to run front and back simultaneously, run:

```bash
docker compose up
``` 

- If you want to run the tests, run:

```bash
docker compose -f docker-compose.e2e.yml up
``` 

## Continuous Integration

The project uses GitHub Actions to run the tests and build the project. The husky post-merge hook will also install the
dependencies for you when you pull from the repository (only if there are newly added ones).

## ✍️ Authors

* **Marc Pinet** - [marcpinet](https://github.com/marcpinet)
* **Thi Thanh Tu Duong** - [luvluvdt3](https://github.com/luvluvdt3)
* **Clément Remy** - [ClementREMY2](https://github.com/ClementREMY2)
* **Loïc Pantano** - [loicpantano](https://github.com/loicpantano)
* **Loïc Palayer** - [loicpalayer](https://github.com/loicpalayer)

## 📃 License

Distributed under the Mozilla Public License Version 2.0 - see the [LICENSE](LICENSE) file for details
