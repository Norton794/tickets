const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.sqlite');

const Department = require('../models/departmentModel');

async function getAllDepartments() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.all('SELECT * FROM departments', (err, rows) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        const departments = rows.map((row) => ({
          id: row.id,
          name: row.name,
        }));
        resolve(departments);
      }
    });
  });
}

async function getDepartmentById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.get('SELECT * FROM departments WHERE id = ?', [id], (err, row) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        if (row) {
          resolve({
            id: row.id,
            name: row.name,
          });
        } else {
          resolve(null);
        }
      }
    });
  });
}

async function createDepartment(name) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('INSERT INTO departments (name) VALUES (?)', [name], function (err) {
      db.close();
      if (err) {
        console.error('Erro ao executar a inserção:', err.message);
        reject(err);
      } else {
        resolve({ id: this.lastID, name });
      }
    });
  });
}

async function updateDepartment(id, name) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('UPDATE departments SET name = ? WHERE id = ?', [name, id], function (err) {
      db.close();
      if (err) {
        console.error('Erro ao executar a atualização:', err.message);
        reject(err);
      } else {
        if (this.changes > 0) {
          resolve({ id, name });
        } else {
          resolve(null);
        }
      }
    });
  });
}

async function deleteDepartment(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('DELETE FROM departments WHERE id = ?', [id], function (err) {
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
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
