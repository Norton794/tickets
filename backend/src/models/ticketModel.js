// src/models/ticketModel.js
const sqlite3 = require('sqlite3').verbose();

class Ticket {
  constructor(id, title, description, status, priority, assignedTo, origin) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.assignedTo = assignedTo;
    this.origin = origin;
  }
}

function initializeDB() {
  const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
      console.log('Conectado ao banco de dados SQLite.');
      db.run(`
        CREATE TABLE IF NOT EXISTS tickets (
          id INTEGER PRIMARY KEY,
          title TEXT,
          description TEXT,
          status TEXT,
          priority TEXT,
          assignedTo INTEGER,
          origin INTEGER,
          FOREIGN KEY(assignedTo) REFERENCES departments(id),
          FOREIGN KEY(origin) REFERENCES sectors(id)
        )
      `);
    }
  });
}

initializeDB();

module.exports = Ticket;
