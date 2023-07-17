// src/models/sectorModel.js
const sqlite3 = require('sqlite3').verbose();

class Sector {
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
        CREATE TABLE IF NOT EXISTS sectors (
          id INTEGER PRIMARY KEY,
          name TEXT UNIQUE
        )
      `);
    }
  });
}

initializeDB();

module.exports = Sector;
