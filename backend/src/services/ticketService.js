
const Ticket = require('../models/ticketModel');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.db');

async function getAllTickets() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.all('SELECT * FROM tickets', (err, rows) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        const tickets = rows.map(
          (row) =>
            new Ticket(
              row.id,
              row.title,
              row.description,
              row.status,
              row.priority,
              row.assignedTo,
              row.origin
            )
        );
        resolve(tickets);
      }
    });
  });
}

async function createTicket(title, description, status, priority, assignedTo, origin) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run(
      'INSERT INTO tickets (title, description, status, priority, assignedTo, origin) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, status, priority, assignedTo, origin],
      function (err) {
        db.close();
        if (err) {
          console.error('Erro ao executar a inserção:', err.message);
          reject(err);
        } else {
          const newTicket = new Ticket(
            this.lastID,
            title,
            description,
            status,
            priority,
            assignedTo,
            origin
          );
          resolve(newTicket);
        }
      }
    );
  });
}

async function updateTicketStatus(id, status) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('UPDATE tickets SET status = ? WHERE id = ?', [status, id], function (err) {
      db.close();
      if (err) {
        console.error('Erro ao executar a atualização:', err.message);
        reject(err);
      } else {
        if (this.changes > 0) {
          const updatedTicket = new Ticket(id, '', '', status, '', '', '');
          resolve(updatedTicket);
        } else {
          resolve(null);
        }
      }
    });
  });
}


async function getTicketById(id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Erro ao abrir o banco de dados:', err.message);
          reject(err);
        }
      });
  
      db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
        db.close();
        if (err) {
          console.error('Erro ao executar a consulta:', err.message);
          reject(err);
        } else {
          if (row) {
            const ticket = new Ticket(
              row.id,
              row.title,
              row.description,
              row.status,
              row.priority,
              row.assignedTo,
              row.origin
            );
            resolve(ticket);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  
  async function updateTicket(id, title, description, status, priority, assignedTo, origin) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Erro ao abrir o banco de dados:', err.message);
          reject(err);
        }
      });
  
      db.run(
        'UPDATE tickets SET title = ?, description = ?, status = ?, priority = ?, assignedTo = ?, origin = ? WHERE id = ?',
        [title, description, status, priority, assignedTo, origin, id],
        function (err) {
          db.close();
          if (err) {
            console.error('Erro ao executar a atualização:', err.message);
            reject(err);
          } else {
            if (this.changes > 0) {
              const updatedTicket = new Ticket(id, title, description, status, priority, assignedTo, origin);
              resolve(updatedTicket);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }
  
  async function deleteTicket(id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Erro ao abrir o banco de dados:', err.message);
          reject(err);
        }
      });
  
      db.run('DELETE FROM tickets WHERE id = ?', [id], function (err) {
        db.close();
        if (err) {
          console.error('Erro ao executar a exclusão:', err.message);
          reject(err);
        } else {
          if (this.changes > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  module.exports = {
    getAllTickets,
    createTicket,
    getTicketById,
    updateTicket,
    updateTicketStatus,
    deleteTicket,
  };
