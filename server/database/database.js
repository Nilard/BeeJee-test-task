const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

// Initialize SQLite database
async function openDB() {
  return sqlite.open({
    filename: './database/database.db',
    driver: sqlite3.Database
  });
}

async function setup() {
  const db = await openDB();
  await db.migrate();
}

setup();

module.exports = openDB;
