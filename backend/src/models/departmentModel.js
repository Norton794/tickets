// src/models/departmentModel.js
const sqlite3 = require('sqlite3').verbose();

class Department {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

function initializeDB() {
  const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
      console.log('Conectado ao banco de dados SQLite.');
      db.run(`
        CREATE TABLE IF NOT EXISTS departments (
          id INTEGER PRIMARY KEY,
          name TEXT UNIQUE
        )
      `);
    }
  });
}

initializeDB();

module.exports = Department;
