const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.sqlite');

class User {
  constructor(id, username, password, accessLevel, departmentId) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.accessLevel = accessLevel;
    this.departmentId = departmentId;
  }
}

function initializeDB() {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
      console.log('Conectado ao banco de dados SQLite.');
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          username TEXT UNIQUE,
          password TEXT,
          accessLevel TEXT,
          departmentId INTEGER,
          FOREIGN KEY(departmentId) REFERENCES departments(id)
        )
      `);
    }
  });
}

initializeDB();

module.exports = User;
