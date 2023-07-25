const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/database.sqlite');

const Sector = require('../models/sectorModel');

async function getAllSectors() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.all('SELECT * FROM sectors', (err, rows) => {
      db.close();
      if (err) {
        console.error('Erro ao executar a consulta:', err.message);
        reject(err);
      } else {
        const sectors = rows.map((row) => ({
          id: row.id,
          name: row.name,
        }));
        resolve(sectors);
      }
    });
  });
}

async function getSectorById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.get('SELECT * FROM sectors WHERE id = ?', [id], (err, row) => {
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

async function createSector(name) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('INSERT INTO sectors (name) VALUES (?)', [name], function (err) {
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

async function updateSector(id, name) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('UPDATE sectors SET name = ? WHERE id = ?', [name, id], function (err) {
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

async function deleteSector(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
        reject(err);
      }
    });

    db.run('DELETE FROM sectors WHERE id = ?', [id], function (err) {
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
  getAllSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector,
};
