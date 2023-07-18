
const User = require('../models/userModel');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.sqlite');

async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./db/database.db', (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        if (row) {
          const user = new User(row.id, row.username, row.password, row.accessLevel, row.departmentId);
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  });
}

module.exports = {
  getUserByUsername,
};
