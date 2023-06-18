# PS6: Polyquiz

## 📝 Description

Polyquiz is a school project for the course *PS6* at Polytech Nice Sophia. It is a quiz game which aims to be used by
nursing residents to test their physical and mental capabilities.
<br>As an admin or nurse, you can create quizzes, add questions and answers, and assign them to residents. The residents
can then play the quizzes and see their results.

The whole project is being supervised by the [Amadeus](https://amadeus.com/) company.

## 🎥 Demo

https://github.com/user-attachments/assets/2a09c0ed-c344-432a-a5bd-af14697f53ce

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

*Note for teachers: here is our current progress for Docker:*
* [X] Step 1
* [X] Step 2
* [ ] Step 3 (in progress, not completed yet)
* [ ] Step 4

This Docker Compose configuration is composed of two separate service compositions. Both configurations use version "3.8" of the Docker Compose specification. Here is a list of observations and explanations about this configuration:

#### First Configuration:

1. **Healthchecks**: There are two services with health checks defined in this configuration, 'backend' and 'frontend'. They use `curl` to check the health of the services by trying to access their respective HTTP endpoints on localhost (`http://localhost:9428` for the backend and `http://localhost:4200` for the frontend). If the HTTP requests fail, the services are considered unhealthy. Health checks are performed every 30 seconds with a timeout of 10 seconds and up to 3 retries.

2. **User**: Both backend and frontend are using a user (appuser) to run the services in a more securized environement.

3. **Accessible Services and URLs**:

- 'backend' service: This service can be accessed on port 9428 of the host machine. As per the configuration, the backend service exposes itself on the 'app-network' network.
- 'frontend' service: This service can be accessed on port 4200 of the host machine. Like the backend, it also uses the 'app-network' network.

1. **Volumes**: Both 'frontend' and 'backend' services use bind mounts to map code from the host into the service containers. They also have volume mounts for `/app/node_modules` which seem to be aimed at persisting installed node modules across container restarts.

2. **Networks**: Both 'frontend' and 'backend' services are part of a user-defined network named 'app-network'. 

#### Second Configuration:

1. **Healthcheck**: The 'front-back-test' service uses `nc` (netcat) to check the health of the service by testing whether port 4200 is open. 

2. **User**: Both backend and frontend are using a user (appuser) to run the services in a more securized environement.

3. **Accessible Services and URLs**:

- 'front-back-test' service: This service can be accessed on ports 4200 and 9428 of the host machine. It is also a part of the 'app-network' network.
- 'frontend-test-e2e' service: As per the configuration, it doesn't expose any ports and thus won't be directly accessible from the host machine.

1. **Volumes**: 'frontend-test-e2e' service uses a named volume 'test-results' to presumably store the test results.

2. **Networks**: Both 'front-back-test' and 'frontend-test-e2e' services are part of the 'app-network' network.

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
