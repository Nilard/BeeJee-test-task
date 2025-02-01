# BeeJee-test-task

You need to create a task manager application (ToDo list).

The backend should be on Node.js (Express), and the frontend on React with the use of a central store (Redux, MobX, or context provider). Any relational database is suitable. There are no special requirements for the design, it should just be neat.

Tasks consist of:
- username
- email
- task text

The start page is a list of tasks with the ability to sort by username, email, and status.

Tasks should be displayed in pages of 3 items each (with pagination).

Any visitor can view the list of tasks and create new ones without authorization.

Make a login for the administrator (login `admin`, password `123`).

The administrator can edit the text of the task and mark it as completed.

Completed tasks in the general list are displayed with the corresponding mark.

## Backend

### Application

Backend app is located in the `server` subfolder. Implemented using [Express](https://expressjs.com), built with [Express application generator](https://expressjs.com/en/starter/generator.html).

### Database

Database is [SQLite](https://www.sqlite.org). The following [NPM](https://www.npmjs.com) packages are used: [sqlite](https://www.npmjs.com/package/sqlite) is the extension for the [sqlite3](https://www.npmjs.com/package/sqlite3) library that adds supports of promises and migrations.

### Configuration

Default port is `3001` can be changed in `server/bin/www` or via `PORT` environment variable.

### Run

To run the application execute the following command from the `server` subfolder: `npm start` or `node ./bin/www`.

## Frontend

### Application

Frontend app is located in the `client` subfolder. Implemented using [React](https://react.dev), built with [Create React App](https://create-react-app.dev) with additional [NPM](https://www.npmjs.com) packages:
- [react-hook-form](https://react-hook-form.com) that adds form validation,
- [react-router-dom](https://reactrouter.com/en/main) that adds routing support.

Layout is built with [Sass](https://sass-lang.com) (SCSS syntax).

### Configuration

Default API URL is `http://localhost:3001` set in `client/src/utils/utils.js`, can be changed there or via `API_URL` environment variable.

### Run

To run the application in the dev mode execute the following command from the `client` subfolder: `npm start`.

To build the application for production use execute the following command from the `client` subfolder: `npm run build`.
