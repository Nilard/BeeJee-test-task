# BeeJee-test-task

Working example: http://beejee.ld.am

## Backend

### Application

Backend app is located in the `server` subfolder. Implemented using [Express](https://expressjs.com), built with [Express application generator](https://expressjs.com/en/starter/generator.html).

### Database

Database is [SQLite](https://www.sqlite.org). The following [NPM](https://www.npmjs.com) packages are used: [sqlite](https://www.npmjs.com/package/sqlite) is the extension for the [sqlite3](https://www.npmjs.com/package/sqlite3) library that adds supports of promises and migrations.

### Run

To run the application execute the following command from the `server` subfolder: `npm start` or `node ./bin/www`.

## Frontend

### Application

Frontend app is located in the `client` subfolder. Implemented using [React](https://react.dev), built with [Create React App](https://create-react-app.dev) with additional [NPM](https://www.npmjs.com) packages:
- [react-hook-form](https://react-hook-form.com) that adds form validation,
- [react-router-dom](https://reactrouter.com/en/main) that adds routing support.

Layout is built with [Sass](https://sass-lang.com) (SCSS syntax).

### Run

To run the application in the dev mode execute the following command from the `client` subfolder: `npm start`.

To build the application for production use execute the following command from the `client` subfolder: `npm run build`.
