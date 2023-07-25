const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.sqlite');

const User = require('../models/userModel');

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.all('SELECT * FROM users', (err, rows) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        const users = rows.map((row) => ({
          id: row.id,
          username: row.username,
          password: row.password,
          accessLevel: row.accessLevel,
          departmentId: row.departmentId,
        }));
        resolve(users);
      }
    });
  });
}


async function createUser(username, password, accessLevel, departmentId) { 
  return new Promise((resolve, reject) => {

    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.all('INSERT INTO users (username, password, accessLevel, departmentId) VALUES (?,?,?,?)', 
    [username, password, accessLevel, departmentId], 
    (err, rows) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a inserção:', err.message);
        reject(err);
      } else {
        const newUser = new User(
          this.lastID,
          username, 
          password, 
          accessLevel, 
          departmentId
        );
        resolve(newUser);
      }
    });

  })
}
 async function getUserById(id) { 
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.all('SELECT * FROM users WHERE id = ?', [id] ,(err, rows) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        const users = rows.map((row) => ({
          id: row.id,
          username: row.username,
          password: row.password,
          accessLevel: row.accessLevel,
          departmentId: row.departmentId,
        }));
        resolve(users);
      }
    });
  });
}

async function updateUser(id, username, password, accessLevel, departmentId) { 
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run(
      'UPDATE users SET username = ?, password = ?, accessLevel = ?, departmentId = ? WHERE id = ?',
      [username, password, accessLevel, departmentId, id],
      function (err) {
        db.close();
        if (err) {
          console.error('Erro ao executar a atualização:', err.message);
          reject(err);
        } else {
          if (this.changes > 0) {
            const updatedUser = new User(id, username, password, accessLevel, departmentId);
            resolve(updatedUser);
          } else {
            resolve(null);
          }
        }
      }
    );
  });
}
async function deleteUser(id) { 
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
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
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
